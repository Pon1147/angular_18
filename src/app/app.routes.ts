import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginUIComponent } from './features/login-ui/login-ui.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // routers mặc định
  { path: 'login', component: LoginUIComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/login' },
  // { path: 'author-list', loadChildren: () => import('./author-list/author-list.module').then(m => m.AuthorListModule) }, // lazy loading module AuthorListModule
];
