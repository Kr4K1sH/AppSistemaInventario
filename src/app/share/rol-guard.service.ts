import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { NotificacionService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuardService implements CanActivate {

constructor( private auth: AuthenticationService, private router:Router,
  private notificacion:NotificacionService) { }

canActivate(route:ActivatedRouteSnapshot):boolean{
//informacion del usuario actual
    let currentUser: any;
    this.auth.currentUser.subscribe((x) => (currentUser=x));
//recibe la configuracion de la ruta con los datos.
const expectedRol= route.data.expectedRol;
//1- Administrador
//2- Encargado
if(!currentUser || currentUser.user.profile_id !== expectedRol){
this.router.navigate(['/home/inicio'],{  queryParams:{auth:'true'},});

this.notificacion.mensaje(
'Usuario',
'Usuario no autorizado para ingresar al recurso solicitado',
'warning'
);

return false;
}
return true;
}


}
