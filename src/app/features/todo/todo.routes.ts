import { Routes } from '@angular/router';
import { ModalAddTodoItemComponent } from '../../shared/components/modal-add-todo-item/modal-add-todo-item.component';

export const todoRoutes: Routes = [
  { path: 'add', component: ModalAddTodoItemComponent, data: { mode: 'add' } },
  { path: 'edit/:id', component: ModalAddTodoItemComponent, data: { mode: 'edit' } },
];
