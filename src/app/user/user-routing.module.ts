import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from '../home/inicio/inicio.component';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';
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
{ path: 'user/registrar', component:UserCreateComponent,canActivate:[AuthGuardService]},
{path: 'user', component:UserAllComponent, canActivate:[AuthGuardService, RolGuardService], data:{expectedRol:1}
},
{path: 'user/:id', component: UserEditComponent,canActivate:[AuthGuardService,RolGuardService], data:{expectedRol:1} },
{path: 'update/:id', component: UserEditComponent,canActivate:[AuthGuardService,RolGuardService],  data:{expectedRol:1} },
{path: 'allDisable', component:UserDisabledComponent,canActivate:[AuthGuardService, RolGuardService], data:{expectedRol:1}},
{path: 'requests', component:UserRequestComponent,canActivate:[AuthGuardService,RolGuardService], data:{expectedRol:1} },
{path: 'showSolicitud/:id', component: UserShowRequestComponent,canActivate:[AuthGuardService,RolGuardService], data:{expectedRol:1}},
{path: 'editAdmin/:id',component: UserEditAdminComponent,canActivate:[AuthGuardService,RolGuardService], data:{expectedRol:1} },
{path: 'showDisabled/:id', component: UserEditDisableAdminComponent,canActivate:[AuthGuardService,RolGuardService]
, data:{expectedRol:1}},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
