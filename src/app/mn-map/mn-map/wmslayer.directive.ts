import { LeafLayerBase } from './leaflayer';
import { Directive, Input } from '@angular/core';
declare var L;

/**
 * Tile Layer  
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'wmslayer',
})
export class WMSLayer extends LeafLayerBase{
  @Input() name: string;
  @Input() url: string;
  @Input() attribution: string;
  @Input() minzoom: number = 1;
  @Input() maxzoom: number = 20;
  @Input() layers: string = "";

  getLayer(){
    this.layer = L.tileLayer.wms(this.url, {layers: this.layers, minZoom: this.minzoom, maxZoom: this.maxzoom, attribution: this.attribution});
    return this.layer;
  }

  isBase(){
    return true;
  }
} 
