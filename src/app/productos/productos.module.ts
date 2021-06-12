import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosreposicionComponent } from './productosreposicion/productosreposicion.component';

@NgModule({
  declarations: [
    ProductosreposicionComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
