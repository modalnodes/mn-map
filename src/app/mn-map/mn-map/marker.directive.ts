import { MarkerLayer } from './markerlayer.directive';
import { Directive, Input, Output, Inject, forwardRef, EventEmitter, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

/**
 * Marker for Marker Layer
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'marker',
})
export class Marker implements AfterContentInit {
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

  //constructor(@Inject(forwardRef(() => MarkerLayer)) private parent:MarkerLayer, private elt:ElementRef){}
  constructor(@Inject(forwardRef(() => MarkerLayer)) private parent:MarkerLayer, private elt:ElementRef, private sanitizer: DomSanitizer, private rd: Renderer2){}
  
  public addMarker(lyr){
    let m = this.getMarker();
    if (m != null){
      lyr.addLayer(m);
    }
  }
  
  public ngAfterContentInit(){
    let content = this.elt.nativeElement;
    let pop = "<div></div>";
    let sanepop = this.sanitizer.bypassSecurityTrustHtml(this.elt.nativeElement);
    console.log(sanepop["changingThisBreaksApplicationSecurity"].innerHtml);  
    if (!this.marker)
      this.prepareMarker();
    //this.rd.setProperty(this.marker["_popup"], "_content", content.innerHtml)
    
    this.marker["_popup"].setContent("<div>"+content.innerHtml+"</div>");
  }

  private marker;

  private prepareMarker(){
    if (this.data == null){
      if (this.lat !== undefined){
        this.marker = L.marker([this.lat, this.lon]);
        this.marker.bindPopup("").openPopup();
        return this.marker;
      }
      else return null;
    } else {
      if (this.data.geometry) {
        if (this.data.geometry.coordinates[0] != 0) {
          this.marker = L.marker(this.data.geometry.coordinates);
          this.marker.bindPopup("").openPopup();
          return this.marker;
        }
      }
    }
  }

  public getMarker(){
    if (!this.marker)
      this.prepareMarker();
    return this.marker;
  }
} 
