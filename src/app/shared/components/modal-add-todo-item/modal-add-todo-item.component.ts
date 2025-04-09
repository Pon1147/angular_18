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
  @Input() open = true;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() taskToEdit: Task | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() addTask = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [0],
      name: ['', stringValidator({ required: true, minLength: 3, pattern: /^[a-zA-Z0-9\s]+$/ })],
      status: ['pending', stringValidator({ required: true })],
      date: ['', dateValidator({ required: true, allowPast: false })],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskToEdit'] && this.taskToEdit && this.mode === 'edit') {
      const formattedDate = this.formatDateForInput(this.taskToEdit.date[0]);
      console.log('Formatted date for edit:', formattedDate);
      this.taskForm.patchValue({
        id: this.taskToEdit.id,
        name: this.taskToEdit.name,
        status: this.taskToEdit.status,
        date: formattedDate,
      });
      this.taskForm.markAllAsTouched(); // Đánh dấu để kiểm tra validator ngay lập tức
    } else if (this.mode === 'add') {
      this.resetForm();
    }
  }

  closeModal() {
    this.close.emit();
    this.resetForm();
  }
  onAddTask() {
    this.taskForm.markAllAsTouched();
    console.log('Form value:', this.taskForm.value);
    console.log('Form invalid:', this.taskForm.invalid);
    console.log('Form errors:', this.taskForm.errors);
    if (this.taskForm.valid) {
      const task: Task = {
        id: this.mode === 'edit' ? this.taskForm.value.id : 0,
        name: this.taskForm.value.name,
        status: this.taskForm.value.status,
        date: [this.formatDate(this.taskForm.value.date)],
      };
      this.addTask.emit(task);
      this.closeModal();
    } else {
      console.log('Form không hợp lệ');
    }
  }
  
  onDateChange(event: any) {
    const selectedDates = event as Date[] | null;
    if (selectedDates && selectedDates.length > 0 && !isNaN(selectedDates[0].getTime())) {
      const date = selectedDates[0];
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      this.taskForm.patchValue({ date: formattedDate });
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