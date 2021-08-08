import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-productos-all',
  templateUrl: './productos-all.component.html',
  styleUrls: ['./productos-all.component.css'],
})

export class ProductAllComponent implements OnInit{

  datos: any;
  searchText = '';

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,

  ) {}

  ngOnInit(): void {
    this.listaProductosAdmin();

  }

  listaProductosAdmin() {
    this.gService
      .list('inventory/product/all')
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




