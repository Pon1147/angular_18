import { Routes } from '@angular/router';
import { homeRoutes } from './features/home/home.routes';
import { LoginUIComponent } from './features/login-ui/login-ui.component';
import { HomeComponent } from './features/home/home.component';
import { TableAuthorComponent } from './features/table-author/table-author.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // routers mặc định
  { path: 'login', component: LoginUIComponent },
  { path: 'home', component: HomeComponent, children: homeRoutes },
  { path: 'author', component: TableAuthorComponent,}, // lazy loading module HomeModule
  { path: '**', redirectTo: '/login' },
];
