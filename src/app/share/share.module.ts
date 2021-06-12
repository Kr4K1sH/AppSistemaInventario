import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogoproductosComponent } from './catalogoproductos/catalogoproductos.component';

@NgModule({
  declarations: [
    CatalogoproductosComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    CatalogoproductosComponent
  ]
})
export class ShareModule { }
