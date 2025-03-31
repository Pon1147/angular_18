import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../app/share/shared.module';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { Todo } from '../../app/share/models/todo.model';


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
    { name: 'Research About Table', status: 'processing', date: 'Mar.28.2025' },
  { name: 'Add Button addNewData to table', status: 'done', date: 'Mar.31.2025' },
  { name: 'Complete Angular Assignment', status: 'pending', date: 'Apr.02.2025' },
  { name: 'Meet with Team', status: 'processing', date: 'Apr.03.2025' },
  { name: 'Write Report', status: 'done', date: 'Apr.04.2025' },
  { name: 'Plan Project Timeline', status: 'pending', date: 'Apr.05.2025' },
  { name: 'Review Code', status: 'processing', date: 'Apr.06.2025' },
  ];

  constructor() {
    //
  }

  ngOnInit(): void {
    this.model.header = [
      new TableHeaderItem({ data: 'Name', title: 'Table header title' }),
      new TableHeaderItem({ data: 'Status', classname: 'my-class' }),
      new TableHeaderItem({ data: 'Date' }),
    ];

    this.model.data = this.todoList.map(todo => [
      new TableItem({ data: todo.name, title: 'Table item title' }),
      new TableItem({ data: todo.status }),
      new TableItem({ data: todo.date }),
    ]);
    this.updateTableData()
    this.model.rowsSelectedChange.subscribe(event =>
      console.log('Bạn đang chọn dòng ' + (event + 1)),
    );
    this.model.selectAllChange.subscribe(event =>
      console.log(event ? 'All rows selected!' : 'All rows deselected!'),
    );
  }

  // Phương thức để cập nhật model.data từ todoList
  private updateTableData() {
    this.model.data = this.todoList.map(todo => [
      new TableItem({ data: todo.name, title: 'Table item title' }),
      new TableItem({ data: todo.status }),
      new TableItem({ data: todo.date }),
    ]);
  }
  addNewData() {
    const newTodo: Todo = {
      name: `Task ${this.todoList.length + 1}`, // Tạo tên động dựa trên số lượng task
      status: 'Pending', // Trạng thái mặc định
      date: 'Edit', // Hành động mặc định
    };
    this.todoList.push(newTodo); // Thêm vào todoList
    this.updateTableData(); // Cập nhật model.data
  }
}
