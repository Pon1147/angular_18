// notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomNotification } from '../../shared/interface/types/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationSubject = new BehaviorSubject<CustomNotification[]>([]);
  notification$ = this.notificationSubject.asObservable();

  showNotification(config: {
    type: 'info' | 'success' | 'error' | 'warning';
    title: string;
    message: string;
    showClose?: boolean;
    lowContrast?: boolean;
    duration?: number;
  }) {
    const maxNotifications = 3;
    const notificationObj: CustomNotification = {
      id: Date.now(),
      type: config.type,
      title: config.title,
      message: config.message,
      showClose: config.showClose ?? true,
      lowContrast: config.lowContrast ?? false,
    };

    const currentNotifications = this.notificationSubject.value;
    let updatedNotifications = [...currentNotifications, notificationObj];

    if (updatedNotifications.length > maxNotifications) {
      updatedNotifications = updatedNotifications.slice(
        updatedNotifications.length - maxNotifications
      );
    }

    this.notificationSubject.next(updatedNotifications);

    if (config.type !== 'error') {
      const duration = config.duration ?? 5000;
      setTimeout(() => {
        this.removeNotification(notificationObj.id);
      }, duration);
    }
  }

  removeNotification(id: number) {
    const currentNotifications = this.notificationSubject.value;
    this.notificationSubject.next(currentNotifications.filter(notif => notif.id !== id));
  }

  clearNotifications() {
    this.notificationSubject.next([]);
  }
}
