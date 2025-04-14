// types/notification.interface.ts
import { NotificationContent } from 'carbon-components-angular';

export interface CustomNotification extends NotificationContent {
  id: number; // Add the id property
}
