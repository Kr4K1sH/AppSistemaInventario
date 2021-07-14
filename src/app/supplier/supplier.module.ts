import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierAllComponent } from './supplier-all/supplier-all.component';
import { SupplierShowComponent } from './supplier-show/supplier-show.component';
import { SupplierCreateComponent } from './supplier-create/supplier-create.component';
import { SupplierRoutingModule} from './supplier-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SupplierAllComponent,
    SupplierShowComponent,
    SupplierCreateComponent,
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    ReactiveFormsModule,


  ],
 // schemas:[NO_ERRORS_SCHEMA],
})
export class SupplierModule { }
