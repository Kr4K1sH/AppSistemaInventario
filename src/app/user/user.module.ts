import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create.component';
import { InicioComponent } from '../home/inicio/inicio.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { UserAllComponent } from './user-all/user-all.component';
import { UserDisabledComponent } from './user-disabled/user-disabled.component';
import { UserShowRequestComponent } from './user-show-request/user-show-request.component';
import { UserEditAdminComponent } from './user-edit-admin/user-edit-admin.component';
import { UserEditDisableAdminComponent } from './user-edit-disable-admin/user-edit-disable-admin.component';




@NgModule({
  declarations: [UserLoginComponent, UserCreateComponent,UserEditComponent, UserRequestComponent, UserAllComponent, UserDisabledComponent, UserShowRequestComponent, UserEditAdminComponent, UserEditDisableAdminComponent ],
  imports: [CommonModule,UserRoutingModule,ReactiveFormsModule],
})

export class UserModule {}
