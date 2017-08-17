import { LeafLayerBase } from './leaflayer';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'mapboxgl'
})
export class MapboxglLayerDirective extends LeafLayerBase{
  @Input() style:string = 'https://raw.githubusercontent.com/osm2vectortiles/mapbox-gl-styles/master/styles/bright-v9-cdn.json';
  @Input() token:string = 'no-token';
  @Input() name:string;

  constructor(){
    super();
  }

  getLayer(){
    let attribution = "";
    let gl_lyr = L["mapboxGL"]({
      accessToken: this.token,
      style: this.style,
    });
    console.log(gl_lyr);
    window["gl"] = gl_lyr;
    return gl_lyr;
  }

  isBase(){
    return true;
  }

}
