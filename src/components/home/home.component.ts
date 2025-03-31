import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodolistComponent } from "../todolist/todolist.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TodolistComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {

  
}
