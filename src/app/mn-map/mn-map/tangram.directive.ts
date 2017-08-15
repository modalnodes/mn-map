import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'tangram'
})
export class TangramDirective {
  @Input() style = "style.yaml";

  constructor() { }

}
