import { Component } from "@angular/core";
import { ResearchComponent } from "./components/research/research.component";

@Component({
  selector: "app-root",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  imports: [ResearchComponent],

})
export class AppComponent { }

