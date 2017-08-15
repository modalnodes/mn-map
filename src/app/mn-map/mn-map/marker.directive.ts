import { MarkerLayer } from './markerlayer.directive';
import { Directive, Input, Output, Inject, forwardRef, EventEmitter } from '@angular/core';

/**
 * Marker for Marker Layer
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'marker',
})
export class Marker{
  @Input() lon:number;
  @Input() lat:number;
  @Input() icon:string;
  @Input() color:string;
  @Input() size:string;
  
  @Input() data:any;
  @Input() set geo_data(value){
    if (value){
      this.data = value;
      this.parent.redraw();
    }
  }
  @Output() datachange = new EventEmitter<any>();

  constructor(@Inject(forwardRef(() => MarkerLayer)) private parent:MarkerLayer){}

  public addMarker(lyr){
    let m = this.getMarker();
    if (m != null){
      lyr.addLayer(m);
      m.openPopup();
    }
  }
  
  public getMarker(){
    if (this.data == null){
      if (this.lat !== undefined)
        return L.marker([this.lat, this.lon]);
      else return null;
    } else {
      if (this.data.geometry) {
        if (this.data.geometry.coordinates[0] != 0) {
          let pop = "<div><h3>"+this.data.properties.RagioneSociale+"</h3><p>"+this.data.properties.Indirizzo+", "+this.data.properties.Frazione + " "+this.data.properties.Comune+"</p></div>";
          return L.marker(this.data.geometry.coordinates).bindPopup(pop).openPopup();
        }
      }
    }
  }
} 
