import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierAllComponent } from './supplier-all/supplier-all.component';
import { SupplierShowComponent } from './supplier-show/supplier-show.component';
import { SupplierCreateComponent } from './supplier-create/supplier-create.component';
import { SupplierUpdateComponent } from './supplier-update/supplier-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SupplierRoutingModule} from './supplier-routing.module';


@NgModule({
  declarations: [
    SupplierAllComponent,
    SupplierShowComponent,
    SupplierCreateComponent,
    SupplierUpdateComponent,
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    ReactiveFormsModule,


  ],
 // schemas:[NO_ERRORS_SCHEMA],
})
export class SupplierModule { }
