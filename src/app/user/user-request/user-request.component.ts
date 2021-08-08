import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css'],
})

export class UserRequestComponent implements OnInit{
  datos: any;
  filterTerm: string;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion:NotificacionService,
  ) {}

  ngOnInit(): void {
    this.mensajes();
    this.listaUsuarios();

  }

  mensajes() {
    let auth = false;
    //Obtener parámetros de la URL
this.route.queryParams.subscribe( (params) => { auth = params.auth || false; } );


if(auth){
this.notificacion.mensaje(
'Usuario',
'Usuario no autorizado para ingresar al recurso solicitado',
'warning'
);
}
}
  listaUsuarios() {
    this.gService
      .list('inventory/user/requests')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }




  ShowRequests(id: any) {
   this.router.navigate(['inventory/user/showSolicitud', id]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

}
