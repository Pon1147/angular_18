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
  @Output() close = new EventEmitter<void>();
  @Output() addTask = new EventEmitter<Task>();

  taskName: string = '';
  taskStatus: 'processing' | 'done' | 'pending' = 'pending';
  taskDate: string = ''; // Chuỗi ngày định dạng yyyy-mm-dd

  closeModal() {
    this.close.emit();
    this.resetForm();
  }

  onAddTask() {
    console.log('Debug - Current Values:', {
      taskName: this.taskName,
      taskStatus: this.taskStatus,
      taskDate: this.taskDate,
    });

    if (this.taskName && this.taskStatus && this.taskDate) {
      console.log('Trạng thái task:', this.taskStatus, 'Kiểu:', typeof this.taskStatus, this.taskDate);
      if (this.taskStatus === 'pending') {
        console.log('Task đang ở trạng thái pending, có thể thêm.');
      }

      const newTask: Task = {
        name: this.taskName,
        status: this.taskStatus,
        date: [this.taskDate], // Chuyển thành mảng chuỗi
      };
      this.addTask.emit(newTask);
      this.closeModal();
    } else {
      console.log('Vui lòng điền đầy đủ thông tin.');
    }
  }

  // Xử lý ngày được chọn từ cds-date-picker
  onDateChange(selectedDates: Date[] | null) {
    if (selectedDates && selectedDates.length > 0 && !isNaN(selectedDates[0].getTime())) {
      const date = selectedDates[0];
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      this.taskDate = `${year}-${month}-${day}`; // Định dạng yyyy-mm-dd
      console.log('Ngày được chọn:', this.taskDate);
    } else {
      this.taskDate = '';
      console.log('Không có ngày được chọn.');
    }
  }

  private resetForm() {
    this.taskName = '';
    this.taskStatus = 'pending';
    this.taskDate = '';
  }
}