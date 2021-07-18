import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from '../home/inicio/inicio.component';
import { UserAllComponent } from './user-all/user-all.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDisabledComponent } from './user-disabled/user-disabled.component';
import { UserEditAdminComponent } from './user-edit-admin/user-edit-admin.component';
import { UserEditDisableAdminComponent } from './user-edit-disable-admin/user-edit-disable-admin.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { UserShowRequestComponent } from './user-show-request/user-show-request.component';

const routes: Routes = [
{ path: 'user/login', component: UserLoginComponent },
{ path: 'user/registrar', component:UserCreateComponent},
{path: 'user', component:UserAllComponent},
{path: 'user/:id', component: UserEditComponent},
{path: 'update/:id', component: UserEditComponent},
{path: 'allDisable', component:UserDisabledComponent},
{path: 'requests', component:UserRequestComponent},
{path: 'showSolicitud/:id', component: UserShowRequestComponent},
{path: 'editAdmin/:id',component: UserEditAdminComponent},
{path: 'showDisabled/:id', component: UserEditDisableAdminComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
