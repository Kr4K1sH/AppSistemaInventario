import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SalidaAllComponent} from './salida-all/salida-all.component';
import {SalidaRoutingModule} from './salida-routing.module';
import { SalidaCreateComponent } from './salida-create/salida-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SalidaAllComponent,
    SalidaCreateComponent
  ],
  imports: [
    CommonModule,
    SalidaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]

})

export class SalidaModule { }
