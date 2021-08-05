import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierAllComponent } from './supplier-all/supplier-all.component';
import { SupplierShowComponent } from './supplier-show/supplier-show.component';
import { SupplierCreateComponent } from './supplier-create/supplier-create.component';
import { SupplierUpdateComponent } from './supplier-update/supplier-update.component';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';


const routes: Routes = [
  {path: 'supplier/all', component: SupplierAllComponent, canActivate:[AuthGuardService]},
  {path: 'supplier/create', component: SupplierCreateComponent, canActivate:[AuthGuardService,RolGuardService], data:{expectedRol:1} },
  {path: 'supplier/:id', component: SupplierShowComponent, canActivate:[AuthGuardService]},
  {path: 'supplier/update/:id', component: SupplierUpdateComponent, canActivate:[AuthGuardService, RolGuardService],data:{expectedRol:1}},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
