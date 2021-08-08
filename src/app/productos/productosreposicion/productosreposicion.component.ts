import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-productosreposicion',
  templateUrl: './productosreposicion.component.html',
  styleUrls: ['./productosreposicion.component.css']
})
export class ProductosreposicionComponent implements OnInit {

  datos: any;
  filterTerm: string;
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {}

  ngOnInit(): void {
    this.listaProductosRepoisicion();
  }

  listaProductosRepoisicion() {
    this.gService
      .list('inventory/product/reposicion')
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
