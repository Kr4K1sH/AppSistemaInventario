import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-productos-ubicacion',
  templateUrl: './productos-ubicacion.component.html',
  styleUrls: ['./productos-ubicacion.component.css']
})
export class ProductosUbicacionComponent implements OnInit {
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
      console.log(this.products);
      this.reactiveForm();
    })

  }

  reactiveForm() {
    this.formUpdate = this.fb.group({
          id: [this.products.id,[Validators.required]],
          idsucursal:['',[]],
          cantidadsucursal:['',[]],
          idBodega:['',[]],
          cantidadBodega:['',[]],
        });

  }


  submitForm() {
    this.makeSubmit = true;
      if(this.formUpdate.invalid){
        return;
      }
      else{

        this.gService.update('inventory/product/updateLocation' , this.formUpdate.value )
        .subscribe((respuesta: any) => {
            this.products = respuesta;
          });
          this.formUpdate.reset();
          this.getProduct(this.products.id);
          //this.router.navigate(['user',this.usuario.id], {
          //   queryParams: { update: 'true' },
          // });

      }
  }

  ngOnInit(): void {}

  get suppliers(): FormArray{
    return this.formUpdate.get('suppliers') as FormArray;
  }

  get supplier_id(): FormArray{
    return this.formUpdate.get('supplier_id') as FormArray;
  }

  getProviders(){
    return this.gService.list('inventory/supplier').subscribe(
      (respuesta: any) => {
        (this.SuppliersList = respuesta);
      },
      (error) => {
        this.error = error;
        this.notification.msjValidacion(this.error);
      }
    );
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
