import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosreposicionComponent } from './productosreposicion/productosreposicion.component';
import { CatalogoproductosComponent } from './catalogoproductos/catalogoproductos.component';
import { ProductosCreateComponent } from './productos-create/productos-create.component';
import { ProductAllComponent } from './productos-all/productos-all.component';
import { ProductosShowComponent } from './productos-show/productos-show.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductosreposicionComponent,
    CatalogoproductosComponent,
    ProductAllComponent,
    ProductosShowComponent,
    ProductosreposicionComponent,
    ProductosCreateComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductosreposicionComponent,
    CatalogoproductosComponent

  ]
})
export class ProductosModule { }
