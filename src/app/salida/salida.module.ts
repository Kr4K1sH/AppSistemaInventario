import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SalidaAllComponent} from './salida-all/salida-all.component';
import {SalidaRoutingModule} from './salida-routing.module';
import { SalidaCreateComponent } from './salida-create/salida-create.component';

@NgModule({
  declarations: [
    SalidaAllComponent,
    SalidaCreateComponent
  ],
  imports: [
    CommonModule,
    SalidaRoutingModule,
  ]

})

export class SalidaModule { }
