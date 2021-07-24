import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-productos-create',
  templateUrl: './productos-create.component.html',
  styleUrls: ['./productos-create.component.css'],
})

export class ProductosCreateComponent implements OnInit{
  error: any;
  products: any;
  SuppliersList: any;
  LocationsList: any;

  categorias: any;
  presentaciones: any;
  currentUser: any;

  FormCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notification: NotificacionService

  ) {
    this.reactiveForm();

  }

  reactiveForm() {
    this.FormCreate = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      cantidad_maxima: ['', [Validators.required]],
      cantidad_minima: ['', [Validators.required]],
      cantidad_total: ['', [Validators.required]],
      costo_unidad: ['', [Validators.required], Validators.pattern('[0-9]+')],
      peso: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      color: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      suppliers: this.fb.array([]),
      supplier_id: this.fb.array([]),
      display_id: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      user_id: ['', [Validators.required]],


    });


    this.getCategorias();
    this.getPresentaciones();
    this.getProviders();

  }

  ngOnInit(): void {}


  submitForm() {

    this.FormCreate.value.estado = 1;
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.FormCreate.value.user_id = this.currentUser.user.id;
    this.makeSubmit = true;

    console.log(this.FormCreate);

    if(this.FormCreate.invalid){
      return;
    }

    this.gService.create('inventory/product', this.FormCreate.value).subscribe((respuesta: any) => {
      this.products = respuesta;
      this.router.navigate(['/producto/all'], {
        queryParams: {register: 'true'},
      });
    });


  }

  getCategorias() {
    this.gService
      .list('inventory/category')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.categorias = data;
      });
  }

  getPresentaciones() {
    this.gService
      .list('inventory/display')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.presentaciones = data;
      });
  }

  getProviders(){
    return this.gService.list('inventory/supplier').subscribe(
      (respuesta: any) => {
        (this.SuppliersList = respuesta), this.checkboxProveedores();
      },
      (error) => {
        this.error = error;
        this.notification.msjValidacion(this.error);
      }
    );
  }

  private checkboxProveedores(){
    this.SuppliersList.forEach(() => {
      const control = new FormControl();
      (this.FormCreate.controls.suppliers as FormArray).push(control);
    });
  }

  /*private checkboxUbicaciones(){
    this.LocationsList.forEach(() => {
      const control = new FormControl();

      (this.FormCreate.controls.locations as FormArray).push(control);
    });
  }*/

   onCheckChangeProveedores(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.FormCreate.controls.supplier_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.supplier_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.FormCreate.controls.supplier_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }


  get suppliers(): FormArray{
    return this.FormCreate.get('suppliers') as FormArray;
  }

  get supplier_id(): FormArray{
    return this.FormCreate.get('supplier_id') as FormArray;
  }

  onBack(){
    this.router.navigate(['/products/all']);
  }

  onReset() {
    this.FormCreate.reset();

  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.FormCreate.controls[control].hasError(error) &&
      this.FormCreate.controls[control].invalid &&
      (this.makeSubmit || this.FormCreate.controls[control].touched)
    );
  };

}
