import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';
import { SalidaAllComponent } from './salida-all/salida-all.component';
import { SalidaCreateComponent } from './salida-create/salida-create.component';

const routes: Routes = [
  {path: 'salida/all', component: SalidaAllComponent, canActivate:[AuthGuardService, RolGuardService], data:{expectedRol:1}},
  {path: 'salida/create', component: SalidaCreateComponent, canActivate:[AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalidaRoutingModule { }
