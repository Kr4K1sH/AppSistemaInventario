import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { productLocation } from 'src/app/models/productLocation'

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
  cantidad: number;

  categorias: any;
  presentaciones: any;
  public detalles: Array<productLocation>;

  FormUpdate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification: NotificacionService

  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProduct(id);

  }

  getProduct(id: number){
    this.gService.get('inventory/product', id).subscribe((respuesta: any) => {
      this.products = respuesta;
      console.log(respuesta);
      this.reactiveForm();
    })

  }

  reactiveForm() {


    if (this.products) {

      this.FormUpdate = this.fb.group({
      id: [this.products.id, [Validators.required]],
      nombre: [this.products.nombre, [Validators.required]],
      descripcion: [this.products.descripcion, [Validators.required]],
      category_id: [this.products.category_id, [Validators.required]],
      cantidad_maxima: [this.products.cantidad_maxima, [Validators.required]],
      cantidad_minima: [this.products.cantidad_minima, [Validators.required]],
      cantidad_total: [this.products.cantidad_total, [Validators.required]],
      costo_unidad: [this.products.costo_unidad, [Validators.required], Validators.pattern('[0-9]+')],
      peso: [this.products.peso, [Validators.required, Validators.pattern('[0-9]+')]],
      color: [this.products.color, [Validators.required]],
      imagen: [this.products.imagen, [Validators.required]],
      suppliers: this.fb.array([]),
      supplier_id: this.fb.array([]),
      locations: this.fb.array([]),
      location_id: this.fb.array([]),
      display_id: [this.products.display_id, [Validators.required]],

      });

    }

    this.getCategorias();
    this.getPresentaciones();
    this.getLocations();
    this.getProviders();
  }

  ngOnInit(): void {

  }

  setDetalles(location: any){
    this.detalles = [new productLocation(1, this.cantidad)]
    this.FormUpdate.value.detalles = this.detalles;

  }

  submitForm() {
    this.makeSubmit = true;
    if(this.FormUpdate.invalid){
      return;
    }

    this.gService.update('inventory/product', this.FormUpdate.value).subscribe((respuesta: any) => {
      this.products = respuesta;
      this.router.navigate(['/product/all'], {
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

  getLocations(){
    return this.gService.list('inventory/location').subscribe(
      (respuesta: any) => {
        (this.LocationsList = respuesta), this.checkboxUbicaciones();
      });
  }

  getProviders(){
    return this.gService.list('inventory/supplier').subscribe(
      (respuesta: any) => {
        (this.SuppliersList = respuesta), this.checkboxProveedores();
      });
  }

  private checkboxProveedores(){
    this.SuppliersList.forEach((o) => {
      let selected = false;
      if (this.products.suppliers.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.FormUpdate.controls.suppliers as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.FormUpdate.controls.supplier_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }


  private checkboxUbicaciones() {
    //Recorrer la lista de contactos y especificar si esta seleccionado
    this.LocationsList.forEach((o) => {
      let selected = false;
      if (this.products.locations.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.FormUpdate.controls.locations as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.FormUpdate.controls.location_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }

   onCheckChangeProveedores(idCheck, event) {

    if (event.target.checked) {

      (this.FormUpdate.controls.supplier_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {

      let i = 0;

      this.supplier_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          (this.FormUpdate.controls.supplier_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

   onCheckChangeUbicaciones(idCheck, event) {

    if (event.target.checked) {


      (this.FormUpdate.controls.location_id as FormArray).push(
        new FormControl(event.target.value)
      );

    } else {

      let i = 0;

      this.location_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {

          (this.FormUpdate.controls.location_id as FormArray).removeAt(i);
          return;

        }

        i++;
      });
    }
  }

  get locations(): FormArray{
    return this.FormUpdate.get('locations') as FormArray;
  }

  get location_id(): FormArray{
    return this.FormUpdate.get('location_id') as FormArray;
  }

  get suppliers(): FormArray{
    return this.FormUpdate.get('suppliers') as FormArray;
  }

  get supplier_id(): FormArray{
    return this.FormUpdate.get('supplier_id') as FormArray;
  }

  onBack(){
    this.router.navigate(['/products/all']);
  }

  onReset() {
    this.FormUpdate.reset();
    this.detalles = [];

  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.FormUpdate.controls[control].hasError(error) &&
      this.FormUpdate.controls[control].invalid &&
      (this.makeSubmit || this.FormUpdate.controls[control].touched)
    );
  };

}

