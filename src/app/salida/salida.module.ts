import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SalidaAllComponent} from './salida-all/salida-all.component';
import {SalidaRoutingModule} from './salida-routing.module';

@NgModule({
  declarations: [
    SalidaAllComponent
  ],
  imports: [
    CommonModule,
    SalidaRoutingModule,
  ]

})

export class SalidaModule { }
