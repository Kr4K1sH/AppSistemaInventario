import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  usuario: any;
  FormUpdate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
     public fb: FormBuilder,
     private router: Router,
     private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService

  ) {

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
       // this.datos = data;
        this.usuario = data;
        this.reactiveForm();
      });

  }

reactiveForm() {
    this.FormUpdate = this.fb.group({
      id: [this.usuario.id,[Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      foto: ['', [Validators.required]],


    });

  }

submitForm() {
    this.makeSubmit = true;
  if(this.FormUpdate.invalid){
return;
  }else{

    this.gService.update('inventory/user/update' , this.FormUpdate.value )
    .subscribe((respuesta: any) => {
        this.usuario = respuesta;
      });
       this.FormUpdate.reset();
       this.obtenerUsuario(this.usuario.id);
      //this.router.navigate(['user',this.usuario.id], {
       //   queryParams: { update: 'true' },
       // });

  }
  }


onReset() {
    this.FormUpdate.reset();
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
