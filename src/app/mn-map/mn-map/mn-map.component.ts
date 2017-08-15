import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mn-map',
  templateUrl: './mn-map.component.html',
  styleUrls: ['./mn-map.component.css']
})
export class MnMapComponent implements OnInit {

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
  @Input() show_legend = true;
  
  toggled = true;
  
  @ContentChildren(BaseLayer) baseLayers: QueryList<LeafLayer>;
  @ContentChildren(NamedLayer) namedLayers: QueryList<LeafLayer>;
  @ContentChildren(DataLayer) dataLayers: QueryList<LeafLayer>;
  @ContentChildren(MarkerLayer) markerLayers: QueryList<LeafLayer>;
  @ContentChildren(MapboxLayer) mapboxLayers: QueryList<LeafLayer>;
  
  @ContentChildren(CityOSLayer) cityoslayer: QueryList<LeafLayer>;
  @ContentChildren(CityOSNearbyLayer) cityosnearbylayer: QueryList<LeafLayer>;
  @ContentChildren(CityOSBackgroundLayer) cityosbglayer: QueryList<LeafLayer>;
  
  // This is the only zoomable layer
  @ContentChild(CityOSMappersLayer) cityosmapperslayer: CityOSMappersLayer;

  @Output() click:EventEmitter<any> = new EventEmitter();
  @Output() movestart:EventEmitter<any> = new EventEmitter();
  @Output() moveend:EventEmitter<any> = new EventEmitter();
  @Output() zoomchange:EventEmitter<number> = new EventEmitter();
  
  public map = null;
  
  layers:Array<LeafLayer> = [];

  private addLayer(layer:LeafLayer){
    this.layers.push(layer);
  }
  
  toggleLegend(){
    this.toggled = !this.toggled;
  }
  
  grid_unit:number = 170;
  grid_gutter:number = 15;
 
  constructor(private elementRef: ElementRef, private flavour:FlavourProviderService){
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
    
    this.baseLayers.forEach(element => {
      this.addLayer(element);
    });
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
    this.cityoslayer.forEach(element => {
      this.addLayer(element);
    });
    this.cityosnearbylayer.forEach(element => {
      this.addLayer(element);
    });
    this.cityosbglayer.forEach(element => {
      this.addLayer(element);
    });
    
    if (this.cityosmapperslayer !== undefined) {
      this.addLayer(this.cityosmapperslayer);
        
      if (this.cityosmapperslayer.zoomlayer)
        this.zoomtolayer = this.cityosmapperslayer;
    }
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

    if(this.zoomtolayer){
      this.zoomtolayer.getBounds(this.map);
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
