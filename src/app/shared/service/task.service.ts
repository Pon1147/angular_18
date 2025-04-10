// task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    const initialTasks: Task[] = [
      { id: 1, name: 'Research About Table', status: 'processing', date: ['28/03/2025'] },
      { id: 2, name: 'Add Button addNewData to table', status: 'done', date: ['31/03/2025'] },
      { id: 3, name: 'Complete Angular Assignment', status: 'pending', date: ['02/04/2025'] },
      { id: 4, name: 'Meet with Team', status: 'processing', date: ['03/04/2025'] },
      { id: 5, name: 'Write Report', status: 'done', date: ['04/04/2025'] },
      { id: 6, name: 'Plan Project Timeline', status: 'pending', date: ['05/04/2025'] },
      { id: 7, name: 'Review Code', status: 'processing', date: ['06/04/2025'] },
    ];
    this.tasksSubject.next(initialTasks);
  }

  addTask(task: Task) {
    const currentTasks = this.tasksSubject.value;
    const newId = currentTasks.length ? Math.max(...currentTasks.map(t => t.id)) + 1 : 1;
    const newTask = { ...task, id: newId };
    this.tasksSubject.next([...currentTasks, newTask]);
  }
  updateTask(updatedTask: Task) {
    const currentTasks = this.tasksSubject.value;
    const index = currentTasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      currentTasks[index] = updatedTask;
      this.tasksSubject.next([...currentTasks]);
    }
  }

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }
}