import { FeatureLayerBase } from './leaflayer';
import { Directive, Input } from '@angular/core';

declare var Tangram;
declare var L;

@Directive({
  selector: 'tangram'
})
export class TangramLayer extends FeatureLayerBase {
  @Input() scene = "style.yaml";
  @Input() base = false;
  @Input() numWorkers = 2;
  @Input() unloadInvisibleTiles = true;
  @Input() updateWhenIdle = false;
  @Input() attribUrl = "";
  @Input() attribName = "";

  constructor() {
    super();
  }
  
  public getLayer(): L.FeatureGroup | Promise<L.FeatureGroup> {
    return Tangram.leafletLayer({
    scene: this.scene,
    numWorkers: this.numWorkers,
    unloadInvisibleTiles: this.unloadInvisibleTiles,
    updateWhenIdle: this.updateWhenIdle,
    attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="'+this.attribUrl+'" target="_blank">'+this.attribName+'</a> | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
});
  }
  public isBase(): boolean {
    return this.base;
  }

}
