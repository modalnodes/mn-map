import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MnMapComponent } from './mn-map/mn-map.component';
import { DataLayer } from './mn-map/datalayer.directive';
import { TangramLayer } from './mn-map/tangram.directive';
import { MarkerLayer } from './mn-map/markerlayer.directive';
import { Marker } from './mn-map/marker.directive';
import { TileLayer } from './mn-map/tilelayer.directive';
import { NamedTileLayer } from './mn-map/namedtilelayer.directive';
import { MapboxLayer } from './mn-map/mapboxlayer.directive';
import { LeafLayer, LayerBase, LeafLayerBase, FeatureLayerBase } from './mn-map/leaflayer';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule ],
  declarations: [MnMapComponent, DataLayer, TangramLayer, MarkerLayer, Marker, TileLayer, NamedTileLayer, MapboxLayer],
  exports: [MnMapComponent, DataLayer, TangramLayer, MarkerLayer, Marker, TileLayer, NamedTileLayer, MapboxLayer],
})
export class MnMapModule { }
