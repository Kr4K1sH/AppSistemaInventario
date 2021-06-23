import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-supplier-show',
  templateUrl: './supplier-show.component.html',
  styleUrls: ['./supplier-show.component.css'],
})

export class SupplierShowComponent implements OnInit{
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');

    this.obtenerProveedor(id);
  }

  obtenerProveedor(id: any) {
    this.gService
      .get('inventory/supplier', id)
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


