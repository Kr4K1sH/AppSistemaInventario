import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAllComponent } from './productos-all/productos-all.component';
import { ProductosShowComponent } from './productos-show/productos-show.component';
import { ProductosreposicionComponent } from './productosreposicion/productosreposicion.component';

const routes: Routes = [
  {path: 'producto/all', component: ProductAllComponent,},
  {path: 'producto/reposicion', component: ProductosreposicionComponent,},
  {path: 'product/:id', component: ProductosShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
