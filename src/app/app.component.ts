import { Component } from "@angular/core";
import { LoginUIComponent } from "../components/login-ui/login-ui.component";



@Component({
  selector: "app-root",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  imports: [LoginUIComponent],

})
export class AppComponent {

}

