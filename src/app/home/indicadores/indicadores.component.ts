import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  datos1: any;
  datos2: any;
  datos3: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {}

  ngOnInit(): void {
    this.totalProducto();
    this.totalEntrada();
    this.totalSalida();
  }

  totalProducto() {
    this.gService
      .list('inventory/product/total')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos1 = data;
      });
  }

  totalEntrada() {
    this.gService
      .list('inventory/totalEntrada')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos2 = data;
      });
  }

  totalSalida() {
    this.gService
      .list('inventory/totalSalida')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos3 = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }


}

