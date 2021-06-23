import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradaAllComponent } from './entrada-all/entrada-all.component';

const routes: Routes = [
  {path: 'entrada/all', component: EntradaAllComponent,},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaRoutingModule { }
