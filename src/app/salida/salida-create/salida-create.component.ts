import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { CartSalidaService, ItemCart } from 'src/app/share/cartSalida.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-salida-create',
  templateUrl: './salida-create.component.html',
  styleUrls: ['./salida-create.component.css'],
})

export class SalidaCreateComponent implements OnInit{
  currentUser: any;
  isAutenticated: boolean;
  fecha = new Date();
  items: ItemCart[] = [];
  qtyItems = 0;
  movement: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    public fb: FormBuilder,
    private cartService: CartSalidaService,
    private gService: GenericService,
    private noti: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getMovement();

  }

  ngOnInit(): void {
     //Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    this.items = this.cartService.getItems();
    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value;
    });

  }

  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.noti.mensaje('Salida', 'Cantidad actualizada', 'success');
  }

  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.noti.mensaje('Salida', 'Producto eliminado de la lista', 'warning');
  }


  mover() {
    if (this.qtyItems > 0) {

      let detalles = {
        detalles: this.cartService.getItems()
      };

      this.gService.create('inventory/salida', detalles)
        .subscribe((respuesta: any) => {
          this.noti.mensaje(
            'Salida',
            'Salida registrada satisfactoriamente',
            'sucess'
          );
          this.cartService.deleteCart();
          this.items = this.cartService.getItems();
        });
    } else {
      this.noti.mensaje('Salida', 'Agregue productos a la lista', 'warning');
    }
  }

  getMovement() {
    this.gService
      .list('inventory/movement/salidas')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.movement = data;
      });
  }







}
