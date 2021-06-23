import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntradaAllComponent} from './entrada-all/entrada-all.component';
import {EntradaRoutingModule} from './entrada-routing.module';

@NgModule({
  declarations: [
    EntradaAllComponent
  ],
  imports: [
    CommonModule,
    EntradaRoutingModule
  ],

})

export class EntradaModule { }
