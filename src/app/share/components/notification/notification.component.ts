import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { NotificationItem, NotificationService, NotificationVariants } from '../../services/notification.services';
import { Subject, Subscription } from 'rxjs';
import { NotificationContent, ActionableContent } from 'carbon-components-angular';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit, OnDestroy {
  actionSubject = new Subject<any>();
  notifications: NotificationItem[] = [];
  notificationObjDefault!: NotificationContent
  readonly notifiVariants = NotificationVariants;
  private subscription: Subscription | undefined;

  constructor(private readonly notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notificationSubject$.subscribe((notifies) => {
      this.notifications = [...notifies];
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeNotification(id: number) {
    this.notificationService.closeNotification(id);
  }

  trackById(index: number, item: NotificationItem): number {
    return item.id;
  }

  // Type guards - Improved to better handle different notification types
  isToastContent(content: any): boolean {
    return content && 'title' in content && 'subtitle' in content;
  }

  isNotificationContent(content: NotificationContent | ActionableContent | any): content is NotificationContent {
    console.log('');
    
    return content && 'message' in content && !('subtitle' in content);
  }

  isActionableContent(content: NotificationContent | ActionableContent | any): content is ActionableContent {
    return content && 'actions' in content && Array.isArray((content as ActionableContent).actions);
  }
}