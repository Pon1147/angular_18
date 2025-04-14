import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // routers mặc định
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login-ui/login-ui.component').then(m => m.LoginUIComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'todo',
    loadComponent: () =>
      import('./features/todo/todo-list/todo-list.component').then(m => m.TodolistComponent),
    children: [
      {
        path: 'add',
        loadComponent: () =>
          import('./shared/components/modal-add-todo-item/modal-add-todo-item.component').then(
            m => m.ModalAddTodoItemComponent,
          ),
        data: { mode: 'add' },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./shared/components/modal-add-todo-item/modal-add-todo-item.component').then(
            m => m.ModalAddTodoItemComponent,
          ),
        data: { mode: 'edit' },
      },
    ],
  }, // lazy loading module HomeModule
  {
    path: 'author',
    loadComponent: () =>
      import('./features/table-author/table-author.component').then(m => m.TableAuthorComponent),
  },
  { path: '**', redirectTo: '/login' },
];
