import { LeafLayerBase } from './leaflayer';
import { Directive, Input } from '@angular/core';
/**
 * Standard Tile Layer 
 * @param name: one of "osm", "positron", "darkmatter", ""
 */
@Directive({
  selector: 'namedlayer',
})
export class NamedTileLayer extends LeafLayerBase {
  @Input() layer:string;

  configs = {
    osms:{name:"OpenStreetMap", url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution:"Map data © <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors", minzoom:1, maxzoom:19},
    osm:{name:"OpenStreetMap", url:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution:"Map data © <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors", minzoom:1, maxzoom:19},

    positron:{name:"Carto Positron", url:"http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>', minzoom:1, maxzoom:19},
    darkmatter:{name:"Carto Dark Matter", url:"http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>', minzoom:1, maxzoom:19},

  };

  getLayer(){
    if(Object.keys(this.configs).indexOf(this.layer) >= 0){
      let lyr = this.configs[this.layer];
      return L.tileLayer(lyr.url, {minZoom: lyr.minzoom, maxZoom: lyr.maxzoom, attribution: lyr.attribution});
    }
    return null;
  } 
  isBase(){
    return true;
  }
  getName(){
    if(this.layer in this.configs){
      return this.configs[this.layer].name;
    }
    return "";
  }
} 
