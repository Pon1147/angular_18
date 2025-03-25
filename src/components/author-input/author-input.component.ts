import { Component } from '@angular/core';
import { SharedModule } from '../../share/shared.module';


@Component({
  selector: 'app-author-input',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './author-input.component.html',
  styleUrl: './author-input.component.scss'
})
export class AuthorInputComponent {
}
