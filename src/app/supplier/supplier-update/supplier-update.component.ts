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

@Component({
  selector: 'app-supplier-update',
  templateUrl: './supplier-update.component.html',
  styleUrls: ['./supplier-update.component.css'],
})

export class SupplierUpdateComponent implements OnInit {

  supplier: any;
  concactsList: any;
  contriesList: any;
  country: any;
  countries: any;

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
    const id =+this.route.snapshot.paramMap.get('id');
    this.getSupplier(id);
  }

  ngOnInit(): void {}

  getSupplier(id: number){
    this.gService.get('inventory/supplier', id).subscribe((respuesta: any) => {
      this.supplier = respuesta;
      this.reactiveForm();
    })

  }

  getCountries() {

    fetch('https://restcountries.eu/rest/v2/all')
    .then(data => {return data.json()})
    .then(
      data => {
        this.countries = data;
      }
    )

    return this.countries;
  }

  getCountriesCode(alpha3code: string){
    fetch('https://restcountries.eu/rest/v2/alpha/' + alpha3code)
    .then(data => {return data.json()})
    .then(
      data => {
        this.country = data;
      }
    )

    return this.country;
  }

  reactiveForm() {
    this.getContacts();
    this.getCountries()

    //Si hay información del videojuego
    if (this.supplier) {

      //Cargar la información del proveedpr
      //en los controles que conforman el formulario
      this.FormUpdate = this.fb.group({
        id: [this.supplier.id, [Validators.required]],
        nombre: [this.supplier.nombre, [Validators.required]],
        direccion: [this.supplier.direccion, [Validators.required]],
        pais: [this.supplier.pais, [Validators.required]],
        contacts: this.fb.array([]),
        contact_id: this.fb.array([]),
      });

    }
  }

  get contacts(): FormArray {
    return this.FormUpdate.get('contacts') as FormArray;
  }
  get contact_id(): FormArray {
    return this.FormUpdate.get('contact_id') as FormArray;
  }

  getContacts(){
    return this.gService
      .list('inventory/contact')
      .subscribe((respuesta: any) => {
        (this.concactsList = respuesta), this.checkboxContacts();
      });
  }

  private checkboxContacts() {
    //Recorrer la lista de contactos y especificar si esta seleccionado
    this.concactsList.forEach((o) => {
      let selected = false;
      if (this.supplier.contacts.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.FormUpdate.controls.contacts as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.FormUpdate.controls.contact_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }

  onCheckChangeContacts(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.FormUpdate.controls.contact_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.contact_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.FormUpdate.controls.contact_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  submitForm() {
    this.makeSubmit = true;

    if(this.FormUpdate.invalid){
      return;
    }

    this.gService.update('inventory/supplier', this.FormUpdate.value).subscribe((respuesta: any) => {
      this.supplier = respuesta;
      this.router.navigate(['/supplier/all'], {
        queryParams: {register: 'true'},
      });
    });
  }

  onReset() {
    this.FormUpdate.reset();
  }
  onBack() {
    this.router.navigate(['/supplier/all']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.FormUpdate.controls[control].hasError(error) &&
      this.FormUpdate.controls[control].invalid &&
      (this.makeSubmit || this.FormUpdate.controls[control].touched)
    );
  };


}
