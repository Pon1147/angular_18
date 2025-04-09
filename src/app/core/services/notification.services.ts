import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum NotificationVariants {
  NOTIFICATION = 'Notification',
  TOAST = 'Toast',
  ACTIONABLE = 'Actionable',
}

interface BaseNotification<T extends NotificationVariants> {
  id: number;
  hide: boolean;
  variant: T;
  content: any; // Using any to accommodate both standard notification types and custom Toast type
}

export type NotificationItem =
  | BaseNotification<NotificationVariants.TOAST>
  | BaseNotification<NotificationVariants.ACTIONABLE>
  | BaseNotification<NotificationVariants.NOTIFICATION>;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationSubject: BehaviorSubject<NotificationItem[]> = new BehaviorSubject<
    NotificationItem[]
  >([]);
  public notificationSubject$ = this.notificationSubject.asObservable();

  constructor() {}

  public showNotification<T extends NotificationVariants>(
    variant: T,
    content: any, // Using any to accommodate both standard notification types and custom Toast type
  ) {
    console.log('Showing notification:', content);

    const newNotification = { id: Date.now(), hide: false, variant, content } as NotificationItem;
    this.notificationSubject.next([...this.notificationSubject.value, newNotification]);

    // Get timeout from content or use default 5000ms
    const timeout = (content as any).timeout || 5000;

    // Tự động ẩn và xóa thông báo sau timeout
    setTimeout(() => {
      newNotification.hide = true;
      this.notificationSubject.next([...this.notificationSubject.value]);

      setTimeout(() => {
        this.notificationSubject.next([
          ...this.notificationSubject.value.filter(n => n.id !== newNotification.id),
        ]);
      }, 500); // Thời gian khớp với animation slideOut
    }, timeout);
  }

  public closeNotification(id: number) {
    // Ẩn thông báo trước khi xóa
    const updatedNotifications = this.notificationSubject.value.map(notification =>
      notification.id === id ? { ...notification, hide: true } : notification,
    );
    this.notificationSubject.next(updatedNotifications);

    // Xóa thông báo sau khi animation hoàn tất
    setTimeout(() => {
      this.notificationSubject.next([...this.notificationSubject.value.filter(n => n.id !== id)]);
    }, 500);
  }
}
