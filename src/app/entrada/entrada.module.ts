import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntradaAllComponent} from './entrada-all/entrada-all.component';
import { EntradaCreateComponent } from './entrada-create/entrada-create.component';
import { EntradaUserComponent } from './entrada-user/entrada-user.component';
import {EntradaRoutingModule} from './entrada-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EntradaAllComponent,
    EntradaCreateComponent,
    EntradaUserComponent
  ],
  imports: [
    CommonModule,
    EntradaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],

})

export class EntradaModule { }
