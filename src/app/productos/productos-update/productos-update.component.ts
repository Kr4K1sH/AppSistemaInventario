import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-productos-update',
  templateUrl: './productos-update.component.html',
  styleUrls: ['./productos-update.component.css'],
})

export class ProductosUpdateComponent implements OnInit{
  error: any;
  products: any;
  SuppliersList: any;
  LocationsList: any;

  categorias: any;
  presentaciones: any;
  currentUser: any;

  formUpdate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification: NotificacionService,


  ) {
    const id =+this.route.snapshot.paramMap.get('id');
    this.getProduct(id);


  }

  getProduct(id: number){
    this.gService.get('inventory/product', id).subscribe((respuesta: any) => {
      this.products = respuesta;
      this.reactiveForm();
    })

  }

  reactiveForm() {
    this.getCategorias();
    this.getPresentaciones();
    this.getProviders();
    if(this.products){
      this.formUpdate = this.fb.group({
      id: [this.products.id, [Validators.required]],
      nombre: [this.products.nombre, [Validators.required]],
      descripcion: [this.products.descripcion, [Validators.required]],
      category_id: [this.products.category_id, [Validators.required]],
      cantidad_maxima: [this.products.cantidad_maxima, [Validators.required]],
      cantidad_minima: [this.products.cantidad_minima, [Validators.required]],
      cantidad_total: [this.products.cantidad_total, [Validators.required]],
      costo_unidad: [this.products.costo_unidad, [Validators.required]],
      peso: [this.products.peso, [Validators.required, Validators.pattern('[0-9]+')]],
      color: [this.products.color, [Validators.required]],
      imagen: [this.products.imagen, [Validators.required]],
      suppliers: this.fb.array([]),
      supplier_id: this.fb.array([]),
      display_id: [this.products.display_id, [Validators.required]],
      estado: [this.products.estado, [Validators.required]],
      user_id: [this.products.user_id, [Validators.required]],


    });
    }

  }

  submitForm() {
    this.makeSubmit = true;

    /*if(this.formUpdate.invalid){
      return;
    }*/

    this.gService.update('inventory/product', this.formUpdate.value).subscribe((respuesta: any) => {
      this.products = respuesta;
      this.router.navigate(['/producto/all'], {
        queryParams: {register: 'true'},
      });
    });

  }

  ngOnInit(): void {}

  get suppliers(): FormArray{
    return this.formUpdate.get('suppliers') as FormArray;
  }

  get supplier_id(): FormArray{
    return this.formUpdate.get('supplier_id') as FormArray;
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
    this.SuppliersList.forEach((o) => {
      let selected = false;
      if (this.products.suppliers.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.suppliers as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formUpdate.controls.supplier_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }

   onCheckChangeProveedores(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.supplier_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.supplier_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.supplier_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  onBack(){
    this.router.navigate(['/producto/all']);
  }

  onReset() {
    this.formUpdate.reset();

  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  };

}
