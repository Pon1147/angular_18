import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NotificationComponent } from "./share/components/notification/notification.component";
import { HeaderFluidComponent } from "./share/components/header-fluid/header-fluid.component";
import { HeaderItem } from "./share/models/header-fluid.interface";
import { SharedModule } from "./share/shared.module";

@Component({
  selector: "app-root",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  imports: [RouterOutlet, NotificationComponent, HeaderFluidComponent, SharedModule],

})
export class AppComponent {
  headerItems: HeaderItem[] = [
    { type: 'item', content: 'Catalog', title: 'Catalog' },
    { type: 'item', content: 'Docs', isCurrentPage: true },
    { type: 'menu', title: 'Manage', menuItems: [{ type: 'item', content: 'Link 1' }] }
  ];
}

