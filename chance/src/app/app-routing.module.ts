import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AccountComponent } from './Page-Components/account/account.component';
import { HomeComponent } from './Page-Components/home/home.component';
import { ProfileComponent } from './Page-Components/profile/profile.component';

// Guards
import { AuthCheckerGuard } from './Guards/auth-checker.guard';
import { LoginService } from './Services/login.service';
import { CreateAccountGuard } from './Guards/create-account.guard';
import { ProfilesComponent } from './Page-Components/profiles/profiles.component';
import { ChatComponent } from './Page-Components/chat/chat.component';
import { UploadComponent } from './Page-Components/upload/upload.component';
import { LoginComponent } from './Big-Components/login/login.component';
import { PostsComponent } from './Page-Components/Posts/posts.component';
import { DashboardComponent } from './Page-Components/dashboard/dashboard.component';
import { DiscoverComponent } from './Page-Components/discover/discover.component';
import { SupportComponent } from './Page-Components/support/support.component';
import { DocumentationComponent } from './Page-Components/documentation/documentation.component';
import { NotFoundComponent } from './Page-Components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent, canActivate: [CreateAccountGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthCheckerGuard] },
  { path: 'profiles/:name', component: ProfilesComponent },
  { path: 'posts/:id', component: PostsComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthCheckerGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthCheckerGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthCheckerGuard] },
  { path: 'support', component: SupportComponent },
  { path: 'documentation', component: DocumentationComponent },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthCheckerGuard, LoginService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
