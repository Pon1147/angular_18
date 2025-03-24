import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],  // add NgModule to import and export components and modules in the app
  standalone: true,  // remove declarations from the component metadata
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'research-v18';
  label1 = `<style>`;
  label2 = `<div [class.active]="isActive">Nội dung</div>`
  label3 = `// Trong file component.ts
export class AppComponent {
  isActive = true;
  }  `;
  label4 = ` <div class ="active">`;
  // Example 1 [class.active] => nếu acctice = true --> thẻ có class
  tasks = [
    { id: 1, name: 'Học Angular 18', completed: false },
    { id: 2, name: 'Thực hành', completed: true },
    { id: 3, name: 'Tìm hiểu', completed: false },
  ];

  toggleTaskCompletion(taskID: number) {
    const task = this.tasks.find(t => t.id === taskID);
    if (task) {
      task.completed = !task.completed;
    }
  }
  handleKeyUp(event: KeyboardEvent, taskId: number) {
    if (event.key === 'Enter' || event.key === ' ') { // Hỗ trợ phím Enter và Space
      this.toggleTaskCompletion(taskId);
    }
  }

  // Example 2 [style.background-color] (nếu true => thẻ sẽ có style background-color)
  isActive = true;
  progress = 75;
}
