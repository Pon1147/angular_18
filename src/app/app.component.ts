import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { HeaderItem } from "./shared/models/header-fluid.interface";
import { NotificationComponent } from "./shared/components/notification/notification.component";
import { SharedModule } from "./shared/shared.module";
import { HeaderFluidComponent } from "./shared/components/header-fluid/header-fluid.component";
import { filter } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  imports: [RouterOutlet, NotificationComponent, SharedModule, HeaderFluidComponent],

})
export class AppComponent {

  constructor(private router: Router) {
    // Theo dõi sự thay đổi route để kiểm tra xem có nên hiển thị header không
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkRoute(event.urlAfterRedirects);
    });
  }

  shouldShowHeader(): boolean {
    // Ẩn header trên trang login
    return !this.router.url.includes('/login');
  }

  private checkRoute(url: string): void {
    // Có thể thêm logic khác nếu cần
  }
  headerItems: HeaderItem[] = [
    { type: 'item', content: 'Home', title: 'Home', isCurrentPage: true , route: ['/home'] },
    { type: 'item', content: 'Author', title: 'Author', route: ['/author'] },
    { type: 'item', content: 'Todo', title: 'Todo', route: ['/todo'] },
    {
      type: 'menu',
      title: 'Manage',
      menuItems: [{ type: 'item', content: 'Link 1', route: ['manage/link1'] }],
    },
  ];
}

