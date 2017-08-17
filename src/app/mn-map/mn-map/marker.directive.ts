import { MarkerLayer } from './markerlayer.directive';
import { Directive, Input, Output, Inject, forwardRef, EventEmitter, ElementRef } from '@angular/core';

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

  constructor(@Inject(forwardRef(() => MarkerLayer)) private parent:MarkerLayer, private elt:ElementRef){}

  public addMarker(lyr){

    let m = this.getMarker();
    if (m != null){
      lyr.addLayer(m);
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
          let pop = "<div>"+this.elt.nativeElement.innerHtml+"</div>";
          let mrk = L.marker(this.data.geometry.coordinates);
          mrk.bindPopup(pop).openPopup();
          return mrk;
        }
      }
    }
  }
} 
