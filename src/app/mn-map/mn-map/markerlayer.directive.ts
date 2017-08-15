import { Marker } from './marker.directive';
import { FeatureLayerBase } from './leaflayer';
import { Directive, Input, ContentChildren, QueryList } from '@angular/core';

/**
 * Marker Layer 
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'markerlayer',
})
export class MarkerLayer extends FeatureLayerBase{
  @Input() name:string;
  @ContentChildren(Marker) dataLayers: QueryList<Marker>;
  
  layer;
  
  getLayer(){
    this.layer =  L.featureGroup();
    this.redraw();
    return this.layer;
  }
  
  redraw(){
    this.layer.clearLayers();
    this.dataLayers.forEach(element => {
      element.addMarker(this.layer);
    });
  }
  
  isBase(){
    return false;
  }
  
} 
