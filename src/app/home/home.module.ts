import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [
    InicioComponent,
    AcercaDeComponent,
    IndicadoresComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule

  ]
})
export class HomeModule { }

