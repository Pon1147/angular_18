import { Component } from "@angular/core";
// import { LoginUIComponent } from "../components/login-ui/login-ui.component";
// import { AuthorListComponent } from "../components/author-list/author-list.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  imports: [RouterOutlet],

})
export class AppComponent {

}

