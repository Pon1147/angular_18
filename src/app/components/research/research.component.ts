import { Component } from '@angular/core';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})

export class ResearchComponent {
  userName = 'John'; // Biến hợp lệ
  // 1user: string = 'Invalid'; // Biến không hợp lệ (bắt đầu bằng số)
  readonly MAX_VALUE = 100; // Hằng số hợp lệ
  // readonly maxValue: number = 100; // Không đúng quy ước
  label1 = `function getUserInfo(){...}`;
  label2 = `function doThis(){...}`;
  getUserInfo(): string {
    return 'User Info'; // Hàm hợp lệ
  }
  // doThis(): void { } // Không đúng quy ước
  label3 = `class UserProfile { ... }`;
  label4 = `class userprofile { ... }`;
}
