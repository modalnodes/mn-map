import { LeafLayerBase } from './leaflayer';
import { Directive, Input } from '@angular/core';
declare var L;

/**
 * Tile Layer  
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'tmslayer',
})
export class TMSLayer extends LeafLayerBase{
  @Input() name: string;
  @Input() url: string;
  @Input() attribution: string;
  @Input() minzoom: number = 1;
  @Input() maxzoom: number = 20;

  getLayer(){
    this.layer = L.tileLayer(this.url, {minZoom: this.minzoom, maxZoom: this.maxzoom, attribution: this.attribution, tms:true});
    return this.layer;
  }

  isBase(){
    return true;
  }
} 
