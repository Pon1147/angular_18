// src/app/shared/services/form-validation.service.ts
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

export class FormValidationService {
  // Validator cho email
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailPattern.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  // Validator cho password
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const minLength = value.length >= 9;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const valid = minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      return valid
        ? null
        : { invalidPassword: { minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } };
    };
  }

  // Kiểm tra xem control có lỗi không
  isInvalid(control: AbstractControl | null): boolean {
    if (!control) return false;
    return !control.valid && (control.dirty || control.touched);
  }

  // Lấy thông báo lỗi cho email
  getEmailErrorMessage(control: AbstractControl | null): string {
    if (!control) return '';
    if (control.hasError('required')) {
      return 'Email là bắt buộc';
    }
    if (control.hasError('invalidEmail')) {
      return 'Email không hợp lệ, vui lòng nhập đúng định dạng (ví dụ: username@ibm.com)';
    }
    return '';
  }

  // Lấy thông báo lỗi cho password
  getPasswordErrorMessage(control: AbstractControl | null): string {
    if (!control) return '';
    if (control.hasError('required')) {
      return 'Mật khẩu là bắt buộc';
    }
    if (control.hasError('invalidPassword')) {
      const errors = control.errors?.['invalidPassword'];
      const messages: string[] = [];
      if (!errors.minLength) messages.push('Mật khẩu phải có ít nhất 9 ký tự');
      if (!errors.hasUpperCase) messages.push('Mật khẩu pAhải có ít nhất 1 chữ cái in hoa');
      if (!errors.hasLowerCase) messages.push('Mật khẩu phải có ít nhất 1 chữ cái thường');
      if (!errors.hasNumber) messages.push('Mật khẩu phải có ít nhất 1 số');
      if (!errors.hasSpecialChar) messages.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
      return messages.join(', ');
    }
    return '';
  }
}
