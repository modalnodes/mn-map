import { MnMapModule } from './mn-map/mn-map.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MnMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
