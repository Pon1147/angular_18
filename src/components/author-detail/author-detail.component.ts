import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../author-list/author-list.component'; // Import interface Author từ component cha

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.css'
})
export class AuthorDetailComponent implements OnInit {
  // Lifecycle hook chạy khi component được khởi tạo
  ngOnInit() {
    console.log('author detail'); // In ra console để kiểm tra khi component được load
  }
  @Input() author: Author = {
    id: 0,
    firstName: '',
    lastName: '',
  };

  // @Output decorator để phát sự kiện từ component con lên component cha
  // Phát sinh sự iện selected lên parent component với EventEmitter
  @Output() select = new EventEmitter<Author>();

  // Phát sinh sự kiện delete lên parent component

  @Output() delete = new EventEmitter<number>();
  // @Input decorator để nhận dữ liệu từ component cha

}
