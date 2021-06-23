import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalidaAllComponent } from './salida-all/salida-all.component';

const routes: Routes = [
  {path: 'salida/all', component: SalidaAllComponent,},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalidaRoutingModule { }
