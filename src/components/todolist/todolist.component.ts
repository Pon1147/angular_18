import { Component, OnInit, SimpleChanges } from '@angular/core';
import { SharedModule } from '../../share/shared.module';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';

export interface Todo {
  name: string;
  status: string;
  action: string;
}

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
  model = new TableModel();
  todoList: Todo[] = [
    { name: 'Name 1', status: 'qwer', action: 'Store' },
    { name: 'Name 3', status: 'zwer', action: 'Store' },
    { name: 'Name 2', status: 'swer', action: 'Store' },
    { name: 'Name 4', status: 'twer', action: 'Store' },
    { name: 'Name 5', status: 'twer', action: 'Store' },
    { name: 'Name 6', status: 'twer', action: 'Store' },
    { name: 'Name 7', status: 'twer', action: 'Store' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.model.header = [
      new TableHeaderItem({ data: 'Name', title: 'Table header title' }),
      new TableHeaderItem({ data: 'Status', classname: 'my-class' }),
      new TableHeaderItem({ data: 'Action' }),
    ];

    this.model.data = this.todoList.map(todo => [
      new TableItem({ data: todo.name, title: 'Table item title' }),
      new TableItem({ data: todo.status }),
      new TableItem({ data: todo.action }),
    ]);

    this.updateTableData(); // cập nhật hàm update Data trong table

    this.model.rowsSelectedChange.subscribe(event => console.log(event));
    this.model.selectAllChange.subscribe(event =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!'),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sortable']) {
      for (let column of this.model.header) {
        column.sortable = changes['sortable'].currentValue;
      }
    }
  }

  // Phương thức để cập nhật model.data từ todoList
  private updateTableData() {
    this.model.data = this.todoList.map(todo => [
      new TableItem({ data: todo.name, title: 'Table item title' }),
      new TableItem({ data: todo.status }),
      new TableItem({ data: todo.action }),
    ]);
  }
  addNewData() {
    const newTodo: Todo = {
      name: `Task ${this.todoList.length + 1}`, // Tạo tên động dựa trên số lượng task
      status: 'Pending', // Trạng thái mặc định
      action: 'Edit', // Hành động mặc định
    };
    this.todoList.push(newTodo); // Thêm vào todoList
    this.updateTableData(); // Cập nhật model.data
  }

}