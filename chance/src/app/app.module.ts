import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//other
import { MatIconModule } from '@angular/material/icon'


//components
import { NavComponent } from './Big-Components/navbar/navbar.component';
import { LoginComponent } from './Big-Components/login/login.component';
import { LoginService } from './Services/login.service';
import { BoxMethodComponent } from './Mini-Components/boxmethod/boxmethod.component';
import { AccountComponent } from './Page-Components/account/account.component';
import { InputIconComponent } from './Mini-Components/inputicon/inputicon.component';
import { HomeComponent } from './Page-Components/home/home.component';

interface GeneralComponents {}

const pageComponents : Array<GeneralComponents> = [HomeComponent, AccountComponent]
const bigComponents : Array<GeneralComponents> = [NavComponent,LoginComponent]
const miniComponents : Array<GeneralComponents> = [BoxMethodComponent, InputIconComponent]

@NgModule({
  declarations: [
    AppComponent,
    pageComponents,
    bigComponents,
    miniComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
