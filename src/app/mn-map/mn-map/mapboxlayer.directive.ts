import { LeafLayerBase } from './leaflayer';
import { Directive, Input } from '@angular/core';

/**
 * Tile Layer 
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'mapboxlayer',
})
export class MapboxLayer extends LeafLayerBase{
  @Input() name:string;
  @Input() owner:string;
  @Input() id:string;
  @Input() token:string;
  @Input() minzoom:number = 1;
  @Input() maxzoom:number = 20;

  getLayer(){
    let url = "https://api.mapbox.com/styles/v1/"+this.owner+"/"+this.id+"/tiles/256/{z}/{x}/{y}?access_token="+this.token;
    console.log(url);
    let attribution = "";
    return L.tileLayer(url, {minZoom: this.minzoom, maxZoom: this.maxzoom, attribution: attribution});
  }
  isBase(){
    return true;
  }
} 
