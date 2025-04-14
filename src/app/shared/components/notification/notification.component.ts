import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CustomNotification } from '../../interface/types/notification.interface';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  notifications: CustomNotification[] = [];

  constructor(private readonly notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(notifs => {
      this.notifications = notifs;
      console.log('notifications', this.notifications);
    });
  }

  onClose(id: number): void {
    this.notificationService.removeNotification(id);
  } 
}