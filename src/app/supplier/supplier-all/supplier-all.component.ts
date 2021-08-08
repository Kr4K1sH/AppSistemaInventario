import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-supplier-all',
  templateUrl: './supplier-all.component.html',
  styleUrls: ['./supplier-all.component.css'],
})

export class SupplierAllComponent implements OnInit{
  datos: any;
  filterTerm: string;
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {}

  ngOnInit(): void {
    this.listaProveedor();
  }

  listaProveedor() {
    this.gService
      .list('inventory/supplier')
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

  actualizarProveedor(id: number) {
    this.router.navigate(['/inventory/supplier/update', id], {
      relativeTo: this.route,
    });
  }

}

