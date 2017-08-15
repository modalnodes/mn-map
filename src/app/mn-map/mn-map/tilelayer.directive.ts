import { LeafLayerBase } from './leaflayer';
import { Directive, Input } from '@angular/core';
declare var L;

/**
 * Tile Layer 
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'tilelayer',
})
export class TileLayer extends LeafLayerBase{
  @Input() name:string;
  @Input() url:string;
  @Input() attribution:string;
  @Input() minzoom:number = 1;
  @Input() maxzoom:number = 20;

  getLayer(){
    this.layer = L.tileLayer(this.url, {minZoom: this.minzoom, maxZoom: this.maxzoom, attribution: this.attribution});
    return this.layer;
  }
  
  isBase(){
    return true;
  }
} 
