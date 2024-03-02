import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AccountComponent } from './Page-Components/account/account.component';
import { HomeComponent } from './Page-Components/home/home.component';
import { ProfileComponent } from './Page-Components/profile/profile.component';

// Guards
import { AuthCheckerGuard } from './auth-checker.guard';
import { LoginService } from './Services/login.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthCheckerGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthCheckerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthCheckerGuard, LoginService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
