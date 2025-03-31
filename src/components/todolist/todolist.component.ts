import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../share/shared.module';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent implements OnInit {
  title = 'Todo List !!!';
  description = 'Below are Todo List';
  batchText = {
    SINGLE: '1 item selected',
    MULTIPLE: '{{count}} items selected',
  };
  // Ủa khoang tính làm cái mảng chứa data :v
  model = new TableModel();
  todoList: any[] = [];

  constructor() {
    // Your initialization logic here
  }
  ngOnInit(): void {
    this.model.header = [
      new TableHeaderItem({
        data: 'Name',
        title: 'Table header title',
      }),
      new TableHeaderItem({
        data: 'Statur',
        classname: 'my-class',
      }),
      new TableHeaderItem({
        data: 'Action',
      }),
    ];
    this.model.rowsSelectedChange.subscribe(event => console.log(event));
    this.model.selectAllChange.subscribe(event =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!'),
    );

    this.model.data = [
      [
        new TableItem({ data: 'Name 1', title: 'Table item title' }),
        new TableItem({ data: 'qwer' }),
        new TableItem({ data: 'Store'})
      ],
      [
        new TableItem({ data: 'Name 3' }),
        new TableItem({ data: 'zwer' }),
        new TableItem({ data: 'Store' }),
      ],
      [
        new TableItem({ data: 'Name 2' }),
        new TableItem({ data: 'swer' }),
        new TableItem({ data: 'Store' }),
      ],
      [
        new TableItem({ data: 'Name 4' }),
        new TableItem({ data: 'twer' }),
        new TableItem({ data: 'Store' }),
      ],
      [
        new TableItem({ data: 'Name 5' }),
        new TableItem({ data: 'twer' }),
        new TableItem({ data: 'Store' }),
      ],
      [
        new TableItem({ data: 'Name 6' }),
        new TableItem({ data: 'twer' }),
        new TableItem({ data: 'Store' }),
      ],
      [
        new TableItem({ data: 'Name 7' }),
        new TableItem({ data: 'twer' }),
        new TableItem({ data: 'Store' }),
      ],
    ];
  }
}
