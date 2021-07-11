import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';


@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css'],
})
export class SupplierCreateComponent implements OnInit {
  error: any;
  supplier: any;
  countries : [];
  concactsList: any;
  productsList: any;

  FormCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notification: NotificacionService

  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.FormCreate = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      contacts: this.fb.array([]),
      contact_id: this.fb.array([]),
      products: this.fb.array([]),
      product_id : this.fb.array([]),

    });
    this.getCountries();
    this.getContacts();

  }
  ngOnInit(): void {}

  submitForm() {
    this.makeSubmit = true;
    let formData = new FormData();
    formData = this.gService.toFormData(this.FormCreate.value);
    formData.append('_method', 'POST');
    this.gService.create_formdata('supplier', formData)
    .subscribe((respuesta: any) => {
      this.supplier = respuesta;
      this.router.navigate(['/supplier/all'], {
        queryParams: {register: 'true'},
      });
    })

  }

  onBack(){
    this.router.navigate(['/supplier/all']);
  }

  onReset() {
    this.FormCreate.reset();
  }

  getCountries() {

    fetch('https://restcountries.eu/rest/v2/all')
    .then(data => {return data.json()})
    .then(
      data => {
        this.countries = data;
        console.log(this.countries);
      }
    )

    return this.countries;
  }

  getContacts() {
     return this.gService.list('inventory/contact').subscribe(
       (data: any) => {
        (this.concactsList = data), this.checkboxcontactos();
      },
      (error)=>{
        this.error = error;
        this.notification.msjValidacion(this.error);
      }
      );
  }

  get contacts(): FormArray{
    return this.FormCreate.get('contacts') as FormArray;
  }

  get contacto_id(): FormArray{
    return this.FormCreate.get('contact_id') as FormArray;
  }

  private checkboxcontactos(){
    this.concactsList.forEach(() => {
      const control = new FormControl();
      (this.FormCreate.controls.contacts as FormArray).push(control);
    });
  }

  onCheckChangeContacts(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.FormCreate.controls.contact_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.contacto_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.FormCreate.controls.contacto_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }


  public errorHandling = (control: string, error: string) => {
    return (
      this.FormCreate.controls[control].hasError(error) &&
      this.FormCreate.controls[control].invalid &&
      (this.makeSubmit || this.FormCreate.controls[control].touched)
    );
  };

}
