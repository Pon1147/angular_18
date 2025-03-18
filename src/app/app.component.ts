import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [FormsModule] // import FormModule để sử dụng
})
export class AppComponent {
  title = 'research-v18';
  user = { // khai báo obj user
    name: 'Khoa Lê', // khai báo các phần tử
    age: 28,
    color: 'Yellow',
  }
  imgURL = 'https://images2.thanhnien.vn/zoom/700_438/528068263637045248/2024/1/26/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912-37-0-587-880-crop-1706239860681642023140.jpg'
  showInfor(){
    alert ('Nice, bạn vừa click vào button')
  }
  userName =''; // khai báo obj user
}
