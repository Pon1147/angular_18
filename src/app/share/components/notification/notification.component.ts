import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { NotificationItem, NotificationService, NotificationVariants } from '../../services/notification.services';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  actionSubject = new Subject<any>();
  notifications: NotificationItem[] = [];
  readonly notifiVariants = NotificationVariants;

  constructor(private readonly notificationService: NotificationService) {}

  ngOnInit() {
      this.notificationService.notificationSubject$.subscribe((notifies) => {
          this.notifications = [...notifies];
      });
  }

  closeNotification(id: number) {
      this.notificationService.closeNotification(id);
  }

  showNotification() {
      this.notificationService.showNotification(this.notifiVariants.NOTIFICATION, {
          type: 'info',
          title: 'Sample notification',
          message: 'Sample info message',
      });
  }

  showToast() {
      this.notificationService.showNotification(this.notifiVariants.TOAST, {
        type: 'info', 
        title: 'Sample toast',
        subtitle: 'Sample subtitle message',
        caption: 'Sample caption',
        message: 'message',
      });
  }

  showActionable() {
      this.notificationService.showNotification(this.notifiVariants.ACTIONABLE, {
          type: 'success',
          title: 'Actionable notification',
          message: 'Sample info message',
          subtitle: 'Sample subtitle message',
          caption: 'Sample caption',
          actions: [
              {
                  text: 'Action',
                  click: this.actionSubject,
              },
          ],
      });
  }
}
