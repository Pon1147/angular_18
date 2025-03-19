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
  title = 'research-v18';
  user = {
    name: 'Kyle',
    age: 18,
  };

  restrictToNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.user.age = Number(input.value);
  }
}
