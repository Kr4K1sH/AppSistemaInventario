import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from '../home/inicio/inicio.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRequestComponent } from './user-request/user-request.component';

const routes: Routes = [
{ path: 'user/login', component: UserLoginComponent },
{ path: 'user/registrar', component:UserCreateComponent},
{path: 'user/:id', component: UserEditComponent},
{path: 'user/solicitudes', component:UserRequestComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
