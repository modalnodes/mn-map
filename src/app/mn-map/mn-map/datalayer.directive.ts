import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { LeafLayerBase } from './leaflayer';


export class Styler{
  style_mode;
  variable;
  style;
  
  constructor(style_mode,variable,style){
    this.style_mode = style_mode;
    this.variable = variable;
    this.style = style;
  }
  
  get func(){
    if (this.style_mode == "value"){
      let v = this.variable;
      let s = JSON.parse(this.style);
      return function(feature){
        let x = feature.properties[v];
        for (let aa of s){
          if (x == aa.value)
            return aa.style;
        }
      };
    } else {
      let v = this.variable;
      let s = JSON.parse(this.style);
      return function(feature){
        let x = feature.properties[v];
        for (let aa of s){
          if (x <= aa.to && x > aa.from)
            return aa.style;
        }
      };
    }
  }
  
  pointstyle(feature){
    let style = {
      radius: 5,
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
    
    if (this.style_mode == "value"){
      let v = this.variable;
      let s = JSON.parse(this.style);
      let x = feature.properties[v];
      for (let aa of s){
        if (x == aa.value){
          style = Object.assign(style,aa.style);
          return style;
        }
      }
    }
    return style;
  }
}

@Directive({
  selector: 'datalayer',
})
export class DataLayer extends LeafLayerBase {
  @Input() type:string = "geojson";
  @Input() mode:string;
  @Input() src:string;
  @Input() name:string;
  @Input() aggregator:string;
  @Input() field:string;
  @Input() variable:string;

  @Input() style_mode:string = "function";

  @Input() style:string="";

  @Input() basestyle:any={};
  @Input() propertystyle:any={};
  @Input() styledproperty:string;
  
  @Output() areaclick = new EventEmitter<any>();

  constructor(private http:Http){
    super();
  }

  getLayer():Promise<L.Layer>{
    if (this.type == "geojson")
      return new Promise<L.Layer>((resolve, react) =>{
        this.http.get(this.src).toPromise().then(x=>{
          //console.log(x);
          resolve(L.geoJSON(x.json(), {
            style:new Styler(this.style_mode, this.variable, this.style).func,
            onEachFeature:(feature, lyr) => {
              lyr.on({
                click:(e)=>{
                  this.areaclick.emit({
                    field:feature.properties[this.field], 
                    feature:feature
                  });
                }
              });
            },
            pointToLayer: (feature, latlng) => {
              let styler = new Styler(this.style_mode, this.variable, this.style);
              return L.circleMarker(latlng, styler.pointstyle(feature));
            }
          }));
        });
      });
    return null;
  } 
  isBase(){
    return false;
  }
  addToMap(m, lc){
    this.getLayer().then(x=>{
      m.addLayer(x);
      lc.addOverlay(x, "DataLayer - "+this.name)
    });
  }
} 
