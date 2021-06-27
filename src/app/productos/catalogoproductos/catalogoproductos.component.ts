import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-catalogoproductos',
  templateUrl: './catalogoproductos.component.html',
  styleUrls: ['./catalogoproductos.component.css']
})
export class CatalogoproductosComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService
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

}