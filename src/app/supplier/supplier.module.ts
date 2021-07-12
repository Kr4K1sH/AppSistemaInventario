import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SupplierAllComponent } from './supplier-all/supplier-all.component';
import { SupplierShowComponent } from './supplier-show/supplier-show.component';
import { SupplierCreateComponent } from './supplier-create/supplier-create.component';
import { SupplierRoutingModule} from './supplier-routing.module';


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
  schemas:[NO_ERRORS_SCHEMA],
})
export class SupplierModule { }
