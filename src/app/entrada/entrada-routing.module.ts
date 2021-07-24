import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradaAllComponent } from './entrada-all/entrada-all.component';
import { EntradaCreateComponent } from './entrada-create/entrada-create.component';

const routes: Routes = [
  {path: 'entrada/all', component: EntradaAllComponent,},
  {path: 'entrada/create', component: EntradaCreateComponent,},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaRoutingModule { }
