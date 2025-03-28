import { Routes } from '@angular/router';
import { LoginUIComponent } from '../components/login-ui/login-ui.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // routers mặc định
  { path: 'login', component: LoginUIComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/login' }
  // { path: 'author-list', loadChildren: () => import('./author-list/author-list.module').then(m => m.AuthorListModule) }, // lazy loading module AuthorListModule
];
