import { Component } from "@angular/core";
import { AuthorListComponent } from "../components/author-list/author-list.component";


@Component({
  selector: "app-root",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  imports: [AuthorListComponent],

})
export class AppComponent {

}

