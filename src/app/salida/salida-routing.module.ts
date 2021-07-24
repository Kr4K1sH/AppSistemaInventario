import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalidaAllComponent } from './salida-all/salida-all.component';
import { SalidaCreateComponent } from './salida-create/salida-create.component';

const routes: Routes = [
  {path: 'salida/all', component: SalidaAllComponent,},
  {path: 'salida/create', component: SalidaCreateComponent,},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalidaRoutingModule { }
