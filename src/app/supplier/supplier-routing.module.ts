import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierAllComponent } from './supplier-all/supplier-all.component';
import { SupplierShowComponent } from './supplier-show/supplier-show.component';


const routes: Routes = [
  {path: 'supplier/all', component: SupplierAllComponent},
  {path: 'supplier/:id', component: SupplierShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
