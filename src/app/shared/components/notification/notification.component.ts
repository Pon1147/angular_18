import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CustomNotification } from '../../interface/types/notification.interface';
import { NotificationService } from '../../service/notification.service';

@Component({
    selector: 'app-notification',
    imports: [SharedModule],
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: CustomNotification[] = [];

  constructor(private readonly notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(notifs => {
      this.notifications = notifs;
    });
  }

  onClose(id: number): void {
    this.notificationService.removeNotification(id);
  } 
}