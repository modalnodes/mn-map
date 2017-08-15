import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MnMapComponent } from './mn-map/mn-map.component';
import { DatalayerDirective } from './mn-map/datalayer.directive';
import { TangramDirective } from './mn-map/tangram.directive';
import { MarkerlayerDirective } from './mn-map/markerlayer.directive';
import { MarkerDirective } from './mn-map/marker.directive';
import { TilelayerDirective } from './mn-map/tilelayer.directive';
import { NamedtilelayerDirective } from './mn-map/namedtilelayer.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MnMapComponent, DatalayerDirective, TangramDirective, MarkerlayerDirective, MarkerDirective, TilelayerDirective, NamedtilelayerDirective]
})
export class MnMapModule { }
