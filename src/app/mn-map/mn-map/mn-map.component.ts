import { MapboxLayer } from './mapboxlayer.directive';
import { MarkerLayer } from './markerlayer.directive';
import { DataLayer } from './datalayer.directive';
import { NamedTileLayer } from './namedtilelayer.directive';
import { LeafLayer } from './leaflayer';
import { ViewChild, ContentChildren, ContentChild, OnInit, OnChanges, Inject, forwardRef, Component,Directive, AfterViewInit, Input, Output, EventEmitter, QueryList, ElementRef, ApplicationRef  } from '@angular/core';

declare var L;

@Component({
  selector: 'mn-map',
  templateUrl: './mn-map.component.html',
  styleUrls: ['./mn-map.component.css']
})
export class MnMapComponent implements OnInit, OnChanges, AfterViewInit {

  ngOnInit(): void {
  }


  private makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  }
  
  @Input() conf:any;
  @Input() map_id:string;
  
  @Input() center:number[] = [51.505,-0.09];
  @Input() minzoom:number = 0;
  @Input() maxzoom:number = 20;
  @Input() startzoom:number = 13;
  
  @Input() controls = true;
  @Input() scrollZoom = false;
  @Input() zoomControl = true;
  
  @Input() zoomtolayer:LeafLayer = null;
  
  @Input() legend = [];
  @Input() show_legend = false;
  
  public toggled = true;
  
  @ContentChildren(NamedTileLayer) namedLayers: QueryList<LeafLayer>;
  @ContentChildren(DataLayer) dataLayers: QueryList<LeafLayer>;
  @ContentChildren(MarkerLayer) markerLayers: QueryList<LeafLayer>;
  @ContentChildren(MapboxLayer) mapboxLayers: QueryList<LeafLayer>;

  @Output() click: EventEmitter<any> = new EventEmitter();
  @Output() movestart: EventEmitter<any> = new EventEmitter();
  @Output() moveend: EventEmitter<any> = new EventEmitter();
  @Output() zoomchange: EventEmitter<number> = new EventEmitter();
  
  public bar = false;
  public map = null;
  
  private layers:Array<LeafLayer> = [];

  private addLayer(layer:LeafLayer){
    this.layers.push(layer);
  }
  
  toggleLegend(){
    this.toggled = !this.toggled;
  }
   
  constructor(private elementRef: ElementRef){
     if(this.map_id == null)
      this.map_id = this.makeid();
  }
  
  clearLayers(){
    this.map.eachLayer(layer=>{
      this.map.removeLayer(layer);
    });
  }
  
  protected prepareLayers(){
    this.clearLayers();
    
	  this.namedLayers.forEach(element => {
      this.addLayer(element);
    });
    this.dataLayers.forEach(element => {
      this.addLayer(element);
    });
    this.markerLayers.forEach(element => {
      this.addLayer(element);
    });
    this.mapboxLayers.forEach(element => {
      this.addLayer(element);
    });
  }
  
  layerControl = null;
  
  startmap() {
    try{
      var c = [14.2681, 40.8518];
      var sz = 14;
      let oc = MnMapComponent.toLatLng(c);
      if(this.center)
        oc = MnMapComponent.toLatLng(this.center);
      if(this.startzoom)
        sz = this.startzoom;
      if (this.map == null)
        this.map = L.map(this.map_id, {
          minZoom:this.minzoom, 
          maxZoom:this.maxzoom, 
          scrollWheelZoom:this.scrollZoom,
          zoomControl: this.zoomControl,
        }).setView(oc, sz);
        
      this.map.on("zoomend", (event)=>{
        this.zoomchange.emit(this.map.getZoom());
      });
      
      this.layerControl = L.control.layers({},{}, {position: 'bottomleft'});
      
      this.setup(this.layerControl);
  
      if(this.controls) {
        this.layerControl.addTo(this.map);
      }
      
      this.map._onResize();
      
    } catch (ex){
      console.log(ex);
    }
  }
  
  view_initialized = false;
  
  ngAfterViewInit(){
    this.startmap();
    this.view_initialized = true;
  }
  
  bls = {};
  dls = {};
  
  setup(lc){
    this.prepareLayers();

    for(let lyr of this.layers){
      lyr.addToMap(this.map, lc);
    }

  }
  
  ngOnChanges(){
    if (this.view_initialized)
      this.setup(this.layerControl);
  }
  
  setCenter(lonlat){
    this.setCenterDict(MnMapComponent.toLatLng(lonlat));
  }
  
  setCenterDict(lonLatDict){
    this.map.panTo(lonLatDict);
  }
  
  search_marker = null;
  addMarker(lonlat){
    this.addMarkerDict(MnMapComponent.toLatLng(lonlat));
  }
  
  addMarkerDict(lonLatDict){
    if (this.search_marker)
      this.map.removeLayer(this.search_marker);
    this.search_marker = L.marker(lonLatDict, {"draggable":true});
    this.search_marker.addTo(this.map);
  }
  
  is_selected(cat){
    return false;  
  }
  
  
  public static toLatLng(obj){
    let nObj = {
      lat:obj[1],
      lng:obj[0]
    };
    return nObj;
  }
  
  public static toGeoJson(latLngDict){
    return {"type": "Point", "coordinates": [latLngDict.lng, latLngDict.lat]};
  }

}
