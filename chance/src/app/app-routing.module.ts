import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { AccountComponent } from './Page-Components/account/account.component';
import { HomeComponent } from './Page-Components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
