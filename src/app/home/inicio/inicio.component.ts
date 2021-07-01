import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notificacion: NotificacionService,
    private authService: AuthenticationService,
    ) {}




  ngOnInit(): void {
  
  }



}
