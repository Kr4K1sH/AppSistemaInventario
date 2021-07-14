import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notification.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  [x: string]: any;
  usuario: any;
  perfiles : any;
 imagenPrevia: any;
  files: any = []
  loading: boolean;

  FormCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }
 // la foto todavia no es requerida porque estamo haciendo pruebas.
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
    this.mensajes();
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
  public errorHandling = (control: string, error: string) => {
    return (
      this.FormCreate.controls[control].hasError(error) &&
      this.FormCreate.controls[control].invalid &&
      (this.makeSubmit || this.FormCreate.controls[control].touched)
    );
  };

}
