import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderItem } from "./shared/models/header-fluid.interface";
import { NotificationComponent } from "./shared/components/notification/notification.component";
import { SharedModule } from "./shared/shared.module";

@Component({
  selector: "app-root",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  imports: [RouterOutlet, NotificationComponent, SharedModule],

})
export class AppComponent {
  headerItems: HeaderItem[] = [
    { type: 'item', content: 'Catalog', title: 'Catalog' },
    { type: 'item', content: 'Docs', isCurrentPage: true },
    { type: 'menu', title: 'Manage', menuItems: [{ type: 'item', content: 'Link 1' }] }
  ];
}

