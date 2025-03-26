import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorDetailComponent } from "../author-detail/author-detail.component";
import { AuthorInputComponent } from '../author-input/author-input.component';


// Interface định nghĩa cấu trúc dữ liệu của một tác giả
export interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-author-list', // Tên selector để sử dụng trong HTML
  standalone: true, // Component này là standalone
  imports: [AuthorDetailComponent, CommonModule, AuthorInputComponent], // Import các module cần thiết
  templateUrl: './author-list.component.html', // Đường dẫn đến file HTML
  styleUrl: './author-list.component.css' // Đường dẫn đến file CSS
})
export class AuthorListComponent implements OnInit {
  // Lifecycle hook chạy khi component được khởi tạo
  ngOnInit() {
    console.log(this.authors.length); // In ra số lượng tác giả trong danh sách
  }

  // Danh sách các tác giả
  authors: Author[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',

    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',

    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',

    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Williams',

    }
  ];

  // Tác giả hiện tại được chọn
  // khai báo biến mới bằng chính mảng authors với vị trí đầu tiền authors[0]
  currentAuthor = this.authors[0];

  // Hàm xử lý khi một tác giả được chọn
  onSelected(selectAuthor: Author) {
    this.currentAuthor = selectAuthor; // Cập nhật tác giả hiện tại
  }

  // Hàm xử lý khi một tác giả bị xoá
  onDelete(id: number) {
    this.authors = this.authors.filter(author => {
      return author.id !== id
    });
    if (this.currentAuthor.id === id) {
      this.currentAuthor = this.authors[0]; // Chọn tác giả đầu tiên nếu tác giả hiện tại bị xóa
    }
  }

  // Hàm xử lý khi tác giả mới được nhập vào
  onAddAuthor(newAuthor: { firstName: string; lastName: string }) {
    // Tạo một ID duy nhất cho tác giả mới
    const newId = this.authors.length > 0 ? Math.max(...this.authors.map(author => author.id)) + 1 : 1;

    // Thêm tác giả mới vào danh sách
    this.authors.push({
      id: newId,
      firstName: newAuthor.firstName,
      lastName: newAuthor.lastName,
    });

    // Tùy chọn: Đặt tác giả mới làm tác giả hiện tại
    this.currentAuthor = this.authors[this.authors.length - 1];

    console.log('New author added:', {
      id: newId,
      firstName: newAuthor.firstName,
      lastName: newAuthor.lastName,
    });
  }
}
