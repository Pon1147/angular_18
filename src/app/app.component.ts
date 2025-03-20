import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [FormsModule, CommonModule],
})
export class AppComponent {
  imgURL = '/img/img_1.png'
  title = 'research-v18';
  items = [
    {
      id: 1, name: 'Kyle'
    },
    {
      id: 2, name: 'Sarah'
    },
    {
      id: 3, name: 'Michael'
    }];
  codeSnippet = `
  <ul>
    <li *ngFor="let item of items; index as i; first as isFirst; last as isLast">
      {{ i + 1 }}. {{ item }} (First: {{ isFirst }}, Last: {{ isLast }})
    </li>
  </ul>`;
  show = '<ng-template>:';
  show1 = `<ng-container>`
  show2 = '{{item}}';
  show3 = `
  <ul>
    <li *ngFor="let item of items; trackBy: trackByFn">{{ item.name }}</li>
  </ul>`;
  show4 = `
  trackByFn(index: number, item: { id: number; name: string }): number {
  return item.id;
  }`;
  show5 = `
  <ng-template ngFor let-item [ngForOf]="items" let-i="index">
      <div>{{ i + 1 }}. {{ item }}</div>
  </ng-template>`;
  show6 = `<!-- Không hợp lệ -->
      <li *ngIf="items.length > 0" *ngFor="let item of items">{{ item.name }}</li>`;
  trackByFn(index: number, item: { id: number; name: string }): number {
    return item.id; // Trả về giá trị duy nhất để theo dõi
  }
}
