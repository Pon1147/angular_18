import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderFluidComponent } from '../../shared/components/header-fluid/header-fluid.component';
import { HeaderItem } from '../../shared/models/header-fluid.interface';
import { TodolistComponent } from '../todo/components/todolist/todolist.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TodolistComponent, HeaderFluidComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  headerItems: HeaderItem[] = [
    { type: 'item', content: 'Home', title: 'Home' },
    { type: 'item', content: 'Docs', isCurrentPage: true },
    {
      type: 'menu',
      title: 'Manage',
      menuItems: [
        { type: 'item', content: 'Link 1' },
        { type: 'item', content: 'Link 2' },
        { type: 'item', content: 'Link 3' },
      ],
    },
  ];
}
