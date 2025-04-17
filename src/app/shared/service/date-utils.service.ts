// src/app/shared/service/date-utils.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {
  formatDate(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date input');
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}