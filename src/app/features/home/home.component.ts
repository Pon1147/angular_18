import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderFluidComponent } from '../../shared/components/header-fluid/header-fluid.component';
import { HeaderItem } from '../../shared/models/header-fluid.interface';
import { TodolistComponent } from '../todo/components/todolist/todolist.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TodolistComponent, HeaderFluidComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  headerItems: HeaderItem[] = [
    { type: 'item', content: 'Home', title: 'Home', isCurrentPage: true },
    { type: 'item', content: 'Author', title: 'Author', route: ['/author'] },
    { type: 'item', content: 'Todo', title: 'Todo', route: ['/todo'] },
    {
      type: 'menu',
      title: 'Manage',
      menuItems: [{ type: 'item', content: 'Link 1', route: ['manage/link1'] }],
    },
  ];
}
