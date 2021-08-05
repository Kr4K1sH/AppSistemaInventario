import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';
import { EntradaAllComponent } from './entrada-all/entrada-all.component';
import { EntradaCreateComponent } from './entrada-create/entrada-create.component';

const routes: Routes = [
  {path: 'entrada/all', component: EntradaAllComponent,canActivate:[AuthGuardService,RolGuardService], data:{expectedRol:1}},
  {path: 'entrada/create', component: EntradaCreateComponent,canActivate:[AuthGuardService,RolGuardService],
data:{expectedRol:1}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaRoutingModule { }
