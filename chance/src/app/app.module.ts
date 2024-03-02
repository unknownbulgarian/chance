import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//other
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';

//components
import { NavComponent } from './Big-Components/navbar/navbar.component';
import { LoginComponent } from './Big-Components/login/login.component';
import { BoxMethodComponent } from './Mini-Components/boxmethod/boxmethod.component';
import { AccountComponent } from './Page-Components/account/account.component';
import { InputIconComponent } from './Mini-Components/inputicon/inputicon.component';
import { HomeComponent } from './Page-Components/home/home.component';
import { ProfileComponent } from './Page-Components/profile/profile.component';
import { ErrorHandleComponent } from './Mini-Components/errorhandle/errorhandle.component';


//services
import { LoginService } from './Services/login.service';
import { SessionService } from './Services/session.service';
import { SuccessHandleComponent } from './Mini-Components/successhandle/successhandle.component';
import { ErrorSuccessService } from './Services/error-success.service';
import { LoadingService } from './Services/loading.service';
import { LoaderComponent } from './Big-Components/loading/loading.component';
import { ProfileBoxComponent } from './Big-Components/navbar/components/profilebox/profilebox.component';
import { NavBarService } from './Services/navbar.service';
import { NotificationBoxComponent } from './Big-Components/navbar/components/notificationbox/notification.component';

interface GeneralComponents { }

const pageComponents: Array<GeneralComponents> = [HomeComponent, AccountComponent, ProfileComponent]
const bigComponents: Array<GeneralComponents> = [NavComponent, LoginComponent, LoaderComponent]
const miniComponents: Array<GeneralComponents> = [BoxMethodComponent, InputIconComponent, ErrorHandleComponent, SuccessHandleComponent]

const NavBarComponents: Array<GeneralComponents> = [ProfileBoxComponent, NotificationBoxComponent]

@NgModule({
  declarations: [
    AppComponent,
    pageComponents,
    bigComponents,
    miniComponents,
    NavBarComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [LoginService, SessionService, ErrorSuccessService, LoadingService, NavBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
