import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAllComponent } from './productos-all/productos-all.component';
import { ProductosShowComponent } from './productos-show/productos-show.component';
import { ProductosreposicionComponent } from './productosreposicion/productosreposicion.component';
import { ProductosCreateComponent } from './productos-create/productos-create.component';
import { ProductosUpdateComponent } from './productos-update/productos-update.component';
import { ProductosUbicacionComponent } from './productos-ubicacion/productos-ubicacion.component';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';

const routes: Routes = [
  {path: 'producto/all', component: ProductAllComponent,  canActivate:[AuthGuardService]},
  {path: 'producto/reposicion', component: ProductosreposicionComponent,canActivate:[AuthGuardService]},
  {path: 'producto/create', component: ProductosCreateComponent,canActivate:[AuthGuardService, RolGuardService],
data:{expectedRol:1}},
  {path: 'product/:id', component: ProductosShowComponent,canActivate:[AuthGuardService]},
  {path: 'producto/update/:id', component: ProductosUpdateComponent,canActivate:[AuthGuardService,RolGuardService]
,data:{expectedRol:1}},
  {path: 'producto/ubicacion/:id', component:ProductosUbicacionComponent,canActivate:[AuthGuardService,RolGuardService], data:{expectedRol:1}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
