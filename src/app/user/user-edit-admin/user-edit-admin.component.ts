import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-edit-admin',
  templateUrl: './user-edit-admin.component.html',
  styleUrls: ['./user-edit-admin.component.css']
})
export class UserEditAdminComponent implements OnInit {
 usuario: any;
  perfiles: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  FormUpdate: FormGroup;
  makeSubmit: boolean = false;

  constructor(
     public fb: FormBuilder,
     private router: Router,
     private gService: GenericService,
     private route: ActivatedRoute,
     private notificacion : NotificacionService,
  ) {

  }
  reactiveForm() {
    this.FormUpdate = this.fb.group({
    // identificacion: ['', [Validators.required]],
   //  name: ['', [Validators.required]],
   //  primerApellido: ['', [Validators.required]],
   //  segundoApellido: ['', [Validators.required]],
   id: [this.usuario.id,[Validators.required]],
     estado : ['',[Validators.required]],
     email: ['', [Validators.required]],
     password: ['', [Validators.required]],
     foto: ['', [Validators.required]],
     profile_id: ['', [Validators.required]],
    });
    this.getRoles();
  }

  ngOnInit(): void {
    this.mensajes();
     //Obtener el id del usuario
    let id = +this.route.snapshot.paramMap.get('id');
    //Obtener el usuario
    this.obtenerUsuario(id);
  }

 obtenerUsuario(id: any) {
    this.gService
      .get('inventory/user', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
       // this.datos = data;
        this.usuario = data;
        this.reactiveForm();
      });

  }

getRoles() {
    this.gService
      .list('inventory/profile')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.perfiles = data;
      });
  }

  submitForm() {
    this.makeSubmit = true;
  if(this.FormUpdate.invalid){
return;
  }else{

    this.gService.update('inventory/user/updateAdmin' , this.FormUpdate.value )
    .subscribe((respuesta: any) => {
        this.usuario = respuesta;
      });
       this.FormUpdate.reset();
      // this.obtenerUsuario(this.usuario.id);
      this.router.navigate(['user'], {
          queryParams: { update: 'true' },
        });

  }
  }



  onReset() {
    this.FormUpdate.reset();
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

ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

public errorHandling = (control: string, error: string) => {
    return (
      this.FormUpdate.controls[control].hasError(error) &&
      this.FormUpdate.controls[control].invalid &&
      (this.makeSubmit || this.FormUpdate.controls[control].touched)
    );
  };


}
