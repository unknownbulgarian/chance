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
import { NotificationBoxComponent } from './Big-Components/navbar/components/notificationbox/notification.component';
import { LoaderComponent } from './Big-Components/loading/loading.component';
import { ProfileBoxComponent } from './Big-Components/navbar/components/profilebox/profilebox.component';
import { SuccessHandleComponent } from './Mini-Components/successhandle/successhandle.component';
import { EditProfileComponent } from './Page-Components/profile/components/editprofile/edit-profile.component';
import { BlankComponent } from './Mini-Components/blank/blank.component';
import { ProfileUserInfoComponent } from './Page-Components/profile/components/userinfo/userinfo.component';
import { MiniLoaderComponent } from './Mini-Components/min-loader/mini-loader.component';
//services
import { LoginService } from './Services/login.service';
import { SessionService } from './Services/session.service';
import { ErrorSuccessService } from './Services/error-success.service';
import { LoadingService } from './Services/loading.service';
import { NavBarService } from './Services/navbar.service';
import { UserInfoService } from './Services/get-userinfo.service';
import { BlankService } from './Services/blank.service';
import { EditProfileService } from './Services/edit-profile.service';
import { ChangeUserInfoService } from './Services/change-userinfo.service';
import { Killer } from './Services/kill-session.service';
import { ProfileUserInfoService } from './Services/profile-userinfo.service';

//utils
import { GlobalVars } from './utils/global';

interface GeneralComponents { }

const pageComponents: Array<GeneralComponents> = [HomeComponent, AccountComponent, ProfileComponent]
const bigComponents: Array<GeneralComponents> = [NavComponent, LoginComponent, LoaderComponent]
const miniComponents: Array<GeneralComponents> = [BoxMethodComponent, InputIconComponent, ErrorHandleComponent, SuccessHandleComponent, BlankComponent, MiniLoaderComponent]

const NavBarComponents: Array<GeneralComponents> = [ProfileBoxComponent, NotificationBoxComponent]
const ProfileComponents: Array<GeneralComponents> = [EditProfileComponent, ProfileUserInfoComponent]

@NgModule({
  declarations: [
    AppComponent,
    pageComponents,
    bigComponents,
    miniComponents,
    NavBarComponents,
    ProfileComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [GlobalVars, LoginService, SessionService, ErrorSuccessService, LoadingService, 
    NavBarService, UserInfoService, BlankService, EditProfileService, ChangeUserInfoService, Killer, ProfileUserInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
