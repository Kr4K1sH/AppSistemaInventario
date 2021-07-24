import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  isAutenticated: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private authService: AuthenticationService,
    private gService: GenericService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    //Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['user/login']);
  }
}
