import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodolistComponent } from '../todolist/todolist.component';
import { HeaderFluidComponent } from '../../app/share/components/header-fluid/header-fluid.component';
import { HeaderItem } from '../../app/share/models/header-fluid.interface';

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
