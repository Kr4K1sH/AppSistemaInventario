import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';
import { ActivatedRoute } from '@angular/router';
import { CartEntradaService } from 'src/app/share/cartEntrada.service';
import { CartSalidaService } from 'src/app/share/cartSalida.service';


@Component({
  selector: 'app-catalogoproductos',
  templateUrl: './catalogoproductos.component.html',
  styleUrls: ['./catalogoproductos.component.css']
})
export class CatalogoproductosComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataProducto: any;
  dataEntrada: any;
  img: any;
  nombre: any;
  idProducto: any;

  filterTerm: string;

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    private cartService: CartEntradaService,
    private cartServiceS: CartSalidaService
  ) {
      this.listaCatlogoProductos();
     }

  ngOnInit(): void {}

  listaCatlogoProductos(){
    this.gService
      .list('inventory/product')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

  obtenerProducto(id: any) {
    this.gService
      .get('inventory/product', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {

        this.dataEntrada = data;
        this.img = this.dataEntrada.imagen;
        this.nombre = this.dataEntrada.nombre;
        this.idProducto = this.dataEntrada.id;
      });
  }


  agregarProductoEntrada(id: number) {
    this.gService
      .get('inventory/product', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.dataProducto = data;
        this.cartService.addToCart(this.dataProducto);
        this.notificacion.mensaje(
          'Inventario',
          'Producto agregado como Entrada de Inventario',
          'success'
        );
      });
  }

  agregarProductoSalida(id: number) {
    this.gService
      .get('inventory/product', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.dataProducto = data;
        this.cartServiceS.addToCart(this.dataProducto);
        this.notificacion.mensaje(
          'Inventario',
          'Producto agregado como Salida de Inventario',
          'success'
        );
      });
  }

}
