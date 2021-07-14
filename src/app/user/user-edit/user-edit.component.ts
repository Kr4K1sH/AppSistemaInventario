import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  //variables create
 [x: string]: any;
  usuario: any;
  perfiles : any;
 imagenPrevia: any;
  files: any = []
  loading: boolean;

  FormCreate: FormGroup;
  makeSubmit: boolean = false;

 //variables edit
   datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
     public fb: FormBuilder,
     private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }
reactiveForm() {
    this.FormCreate = this.fb.group({
      identificacion: ['', [Validators.required]],
       name: ['', [Validators.required]],
        primerApellido: ['', [Validators.required]],
          segundoApellido: ['', [Validators.required]],
          estado :2 ,
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],

       foto: ['', [Validators.required]],
      profile_id: ['', [Validators.required]],

    });
    this.getRoles();
  }
  ngOnInit(): void {
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
        this.datos = data;
      });
  }
submitForm() {
    this.makeSubmit = true;
    this.authService
      .createUser(this.FormCreate.value)
      .subscribe((respuesta: any) => {
        this.usuario = respuesta;
        this.router.navigate(['user/login'], {
          queryParams: { register: 'true' },
        });
      });
  }

onReset() {
    this.FormCreate.reset();
  }
  getRoles() {
    this.gService
      .list('inventory/profile')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.perfiles = data;
      });
  }

ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
public errorHandling = (control: string, error: string) => {
    return (
      this.FormCreate.controls[control].hasError(error) &&
      this.FormCreate.controls[control].invalid &&
      (this.makeSubmit || this.FormCreate.controls[control].touched)
    );
  };
}
