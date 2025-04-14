// modal-add-todo-item.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { Task } from '../../models/todo.model';
import { stringValidator, dateValidator } from '../../validator/form-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-modal-add-todo-item',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-add-todo-item.component.html',
  styleUrls: ['./modal-add-todo-item.component.scss'],
})
export class ModalAddTodoItemComponent implements OnInit {
  open = true;
  mode: 'add' | 'edit' = 'add';
  taskForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly taskService: TaskService,
  ) {
    this.taskForm = this.fb.group({
      id: [0],
      name: ['', stringValidator({ required: true, minLength: 3, pattern: /^[a-zA-Z0-9\s]+$/ })],
      status: ['pending', stringValidator({ required: true })],
      date: ['', dateValidator({ required: true, allowPast: false })],
    });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = data['mode'] || 'add';
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        const taskId = +params['id'];
        const taskToEdit = this.taskService.getTasks().find(t => t.id === taskId);
        if (taskToEdit) {
          const formattedDate = this.formatDateForInput(taskToEdit.date[0]);
          this.taskForm.patchValue({
            id: taskToEdit.id,
            name: taskToEdit.name,
            status: taskToEdit.status,
            date: formattedDate,
          });
        }
      }
    });
  }

  closeModal() {
    this.router.navigate(['/todo']);
  }

  onAddTask() {
    if (this.taskForm.valid) {
      const formattedDate = this.formatDate(this.taskForm.value.date);
      const task: Task = {
        id: this.mode === 'edit' ? this.taskForm.value.id : 0,
        name: this.taskForm.value.name,
        status: this.taskForm.value.status,
        date: [formattedDate],
      };

      if (this.mode === 'add') {
        this.taskService.addTask(task);
      } else if (this.mode === 'edit') {
        this.taskService.updateTask(task);
      }
      this.closeModal();
    }
  }

  onDateChange(event: Date[] | null) {
    const selectedDates = event;
    if (selectedDates && selectedDates.length > 0 && !isNaN(selectedDates[0].getTime())) {
      const date = selectedDates[0];
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      this.taskForm.patchValue({ date: formattedDate });
    }
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