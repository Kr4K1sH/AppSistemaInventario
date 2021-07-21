import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAllComponent } from './productos-all/productos-all.component';
import { ProductosShowComponent } from './productos-show/productos-show.component';
import { ProductosreposicionComponent } from './productosreposicion/productosreposicion.component';
import { ProductosCreateComponent } from './productos-create/productos-create.component';
import { ProductosUpdateComponent } from './productos-update/productos-update.component';


const routes: Routes = [
  {path: 'producto/all', component: ProductAllComponent,},
  {path: 'producto/reposicion', component: ProductosreposicionComponent,},
  {path: 'producto/create', component: ProductosCreateComponent,},
  {path: 'product/:id', component: ProductosShowComponent},
  {path: 'producto/update/:id', component: ProductosUpdateComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
