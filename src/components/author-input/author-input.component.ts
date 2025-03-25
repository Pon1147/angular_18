import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../share/shared.module';


@Component({
  selector: 'app-author-input',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './author-input.component.html',
  styleUrl: './author-input.component.scss'
})
export class AuthorInputComponent {
  newAuthorFirstName = '';
  newAuthorLastName = '';

  @Output() addAuthor = new EventEmitter<{ firstName: string, lastName: string }>();
  // hàm drop down đẩy data từ child -> parent với 2 item firstName(stirng) và lastName(stirng).

  onAddAuthor() {
    if (this.newAuthorFirstName && this.newAuthorLastName) { //nếu cả 2 biến này đều được gáng giá trị
      this.addAuthor.emit({ //thì sẽ add emit vào trong biến addAuthor với 2 item bên dưới
        firstName: this.newAuthorFirstName,
        lastName: this.newAuthorLastName
      });
      this.newAuthorFirstName = '';
      this.newAuthorLastName = '';
    } else {
      alert('Please enter both first name and last name');
    }
  }
}
