import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-productos-show',
  templateUrl: './productos-show.component.html',
  styleUrls: ['./productos-show.component.css'],
})

export class ProductosShowComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    let id = +this.route.snapshot.paramMap.get('id');

    this.obtenerProducto(id);
  }
  obtenerProducto(id: any) {
    this.gService
      .get('inventory/product', id)
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
