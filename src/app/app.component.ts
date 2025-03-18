import { Component } from '@angular/core';
import { HelloComponent } from "./Components/hello/hello.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HelloComponent]
})
export class AppComponent {
  title = 'research-v18';
}
