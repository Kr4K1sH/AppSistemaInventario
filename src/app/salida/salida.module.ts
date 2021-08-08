import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SalidaAllComponent} from './salida-all/salida-all.component';
import {SalidaRoutingModule} from './salida-routing.module';
import { SalidaCreateComponent } from './salida-create/salida-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
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
    Ng2SearchPipeModule,
    FormsModule
  ]

})

export class SalidaModule { }
