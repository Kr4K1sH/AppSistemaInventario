import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create.component';
import { InicioComponent } from '../home/inicio/inicio.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserRequestComponent } from './user-request/user-request.component';


@NgModule({
  declarations: [UserLoginComponent, UserCreateComponent,UserEditComponent, UserRequestComponent],
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule],
})

export class UserModule {}
