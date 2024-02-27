import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AccountComponent } from './Page-Components/account/account.component';
import { HomeComponent } from './Page-Components/home/home.component';

// Services
import { SessionService } from './Services/session.service';

// Guards
import { AuthCheckerGuard } from './auth-checker.guard';
import { LoginService } from './Services/login.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthCheckerGuard, LoginService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
