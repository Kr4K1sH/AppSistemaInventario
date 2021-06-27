import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificacionService } from 'src/app/share/notification.service';

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
  ) {
   }

  ngOnInit(): void {
    this.notificacion.mensaje(
        'Usuario',
        'Bienvenido! Listo par un nuevo dia de trabajo',
        'success'
      );
  }
  
}
