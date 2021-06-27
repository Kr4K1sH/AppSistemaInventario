import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { UserLoginComponent } from './user/user-login/user-login.component';


const routes: Routes = [

   {path: '', component: UserLoginComponent},
   {path: 'home/inicio', component: InicioComponent},
    // { path: '', component: InicioComponent, redirectTo:'' , pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
