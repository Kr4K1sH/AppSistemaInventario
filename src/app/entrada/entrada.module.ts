import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntradaAllComponent} from './entrada-all/entrada-all.component';
import { EntradaCreateComponent } from './entrada-create/entrada-create.component';
import {EntradaRoutingModule} from './entrada-routing.module';

@NgModule({
  declarations: [
    EntradaAllComponent,
    EntradaCreateComponent
  ],
  imports: [
    CommonModule,
    EntradaRoutingModule
  ],

})

export class EntradaModule { }
