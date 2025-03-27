import { Component } from "@angular/core";
import { LoginUIComponent } from "../components/login-ui/login-ui.component";
import { AuthorListComponent } from "../components/author-list/author-list.component";



@Component({
  selector: "app-root",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  imports: [LoginUIComponent, AuthorListComponent],

})
export class AppComponent {

}

