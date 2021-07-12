import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserModule } from '../user/user.module';
import { UserLoginComponent } from '../user/user-login/user-login.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,UserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,

  ]
})
export class CoreModule { }
