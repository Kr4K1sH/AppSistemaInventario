import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosreposicionComponent } from './productosreposicion/productosreposicion.component';
import { CatalogoproductosComponent } from './catalogoproductos/catalogoproductos.component';
import { ProductosShowComponent } from './productos-show/productos-show.component';
import { ProductosCreateComponent } from './productos-create/productos-create.component';
import { ProductAllComponent } from './productos-all/productos-all.component';
import { ProductosUpdateComponent } from './productos-update/productos-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosUbicacionComponent } from './productos-ubicacion/productos-ubicacion.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductosreposicionComponent,
    CatalogoproductosComponent,
    ProductAllComponent,
    ProductosShowComponent,
    ProductosreposicionComponent,
    ProductosCreateComponent,
    ProductosUpdateComponent,
    ProductosUbicacionComponent,

  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule,
    FormsModule,


  ],
  exports: [
    ProductosreposicionComponent,
    CatalogoproductosComponent

  ]
})
export class ProductosModule { }
