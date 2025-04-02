import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Task } from '../../models/todo.model';

@Component({
  selector: 'app-modal-add-todo-item',
  standalone: true,
  imports: [ SharedModule],
  templateUrl: './modal-add-todo-item.component.html',
  styleUrls: ['./modal-add-todo-item.component.scss'],
})

export class ModalAddTodoItemComponent {
  @Input() open = false;
  @Input() mode: 'add' | 'edit' = 'add'; // Chế độ: thêm mới hoặc chỉnh sửa
  @Input() taskToEdit: Task | null = null; // Task cần chỉnh sửa
  @Output() close = new EventEmitter<void>();
  @Output() addTask = new EventEmitter<Task>();

  heading1 = "Add Todo Item";
  heading2 = "Edit Todo Item";

  taskId: number = 0;
  taskName: string = '';
  taskStatus: 'processing' | 'done' | 'pending' = 'pending';
  taskDate: string = '';

  ngOnInit() {
    // Nếu ở chế độ chỉnh sửa, điền dữ liệu từ taskToEdit vào form
    console.log('Mode nhận được:', this.mode); // Kiểm tra giá trị mode
    if (this.mode === 'edit' && this.taskToEdit) {
      this.taskId = this.taskToEdit.id;
      this.taskName = this.taskToEdit.name;
      this.taskStatus = this.taskToEdit.status;
      this.taskDate = this.taskToEdit.date[0];
    }
  }

  closeModal() {
    this.close.emit();
    this.resetForm();
  }

  onAddTask() {
    if (this.taskName && this.taskStatus && this.taskDate) {
      const task: Task = {
        id: this.mode === 'edit' ? this.taskId : 0, 
        name: this.taskName,
        status: this.taskStatus,
        date: [this.taskDate],
      };
      this.addTask.emit(task);
      this.resetForm();
      this.closeModal();
    } else {
      console.log('Vui lòng điền đầy đủ thông tin.');
    }
  }

  onDateChange(selectedDates: Date[] | null) {
    if (selectedDates && selectedDates.length > 0 && !isNaN(selectedDates[0].getTime())) {
      const date = selectedDates[0];
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      this.taskDate = `${year}-${month}-${day}`;
    } else {
      this.taskDate = '';
    }
  }

  private resetForm() {
    this.taskId = 0;
    this.taskName = '';
    this.taskStatus = 'pending';
    this.taskDate = '';
  }
}