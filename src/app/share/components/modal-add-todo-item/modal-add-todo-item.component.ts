import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { Task } from '../../models/todo.model';
import { stringValidator, dateValidator } from '../../validator/form-validator';

@Component({
  selector: 'app-modal-add-todo-item',
  standalone: true,
  imports: [SharedModule], // Sử dụng SharedModule đã bao gồm ReactiveFormsModule và các thành phần Carbon
  templateUrl: './modal-add-todo-item.component.html',
  styleUrls: ['./modal-add-todo-item.component.scss'],
})
export class ModalAddTodoItemComponent implements OnChanges {
  @Input() open = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() taskToEdit: Task | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() addTask = new EventEmitter<Task>();

  heading1 = 'Add Todo Item';
  heading2 = 'Edit Todo Item';

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [0],
      name: ['', stringValidator({ required: true, minLength: 3, pattern: /^[a-zA-Z0-9\s]+$/ })],
      status: ['pending', stringValidator({ required: true })],
      date: ['', dateValidator({ required: true, allowPast: false })],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskToEdit'] && this.taskToEdit && this.mode === 'edit') {
      console.log('Task được chọn:', this.taskToEdit);
      this.taskForm.patchValue({
        id: this.taskToEdit.id,
        name: this.taskToEdit.name,
        status: this.taskToEdit.status,
        date: this.formatDateForInput(this.taskToEdit.date[0]), // Chuyển đổi DD/MM/YYYY sang YYYY-MM-DD
      });
    } else if (this.mode === 'add') {
      this.resetForm();
    }
  }

  closeModal() {
    this.close.emit();
    this.resetForm();
  }

  onAddTask() {
    if (this.taskForm.valid) {
      const task: Task = {
        id: this.mode === 'edit' ? this.taskForm.value.id : 0,
        name: this.taskForm.value.name,
        status: this.taskForm.value.status,
        date: [this.formatDate(this.taskForm.value.date)], // Trả về mảng [string] định dạng DD/MM/YYYY
      };
      this.addTask.emit(task);
      this.closeModal();
    } else {
      console.log('Form không hợp lệ:', this.taskForm.errors);
    }
  }

  onDateChange(event: any) {
    const selectedDates = event.value as Date[] | null;
    if (selectedDates && selectedDates.length > 0 && !isNaN(selectedDates[0].getTime())) {
      const date = selectedDates[0];
      this.taskForm.patchValue({
        date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
      });
    } else {
      this.taskForm.patchValue({ date: '' });
    }
  }

  private resetForm() {
    this.taskForm.reset({
      id: 0,
      name: '',
      status: 'pending',
      date: '',
    });
  }

  private formatDateForInput(dateStr: string): string {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}