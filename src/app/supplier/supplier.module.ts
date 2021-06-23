import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierAllComponent } from './supplier-all/supplier-all.component';
import { SupplierShowComponent } from './supplier-show/supplier-show.component';
import { SupplierRoutingModule} from './supplier-routing.module';

@NgModule({
  declarations: [
    SupplierAllComponent,
    SupplierShowComponent,
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule
  ]
})
export class SupplierModule { }
