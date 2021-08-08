import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-entrada-user',
  templateUrl: './entrada-user.component.html',
  styleUrls: ['./entrada-user.component.css'],
})

export class EntradaUserComponent implements OnInit{

  datos: any;
  filterTerm: string;
  
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {}

  ngOnInit(): void {
    this.listaUser();
  }

  listaUser() {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    var id = this.currentUser.user.id;
    this.gService
      .get('inventory/entradas/user', id)
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
