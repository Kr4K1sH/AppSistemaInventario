import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosreposicionComponent } from './productosreposicion/productosreposicion.component';
import { CatalogoproductosComponent } from './catalogoproductos/catalogoproductos.component';
import { ProductAllComponent } from './productos-all/productos-all.component';
import { ProductosShowComponent } from './productos-show/productos-show.component';

@NgModule({
  declarations: [
    ProductosreposicionComponent,
    CatalogoproductosComponent,
    ProductAllComponent,
    ProductosShowComponent
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
