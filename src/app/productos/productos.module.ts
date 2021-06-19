import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosreposicionComponent } from './productosreposicion/productosreposicion.component';
import { CatalogoproductosComponent } from './catalogoproductos/catalogoproductos.component';

@NgModule({
  declarations: [
    ProductosreposicionComponent,
    CatalogoproductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ],
  exports: [
    ProductosreposicionComponent,
    CatalogoproductosComponent


  ]
})
export class ProductosModule { }
