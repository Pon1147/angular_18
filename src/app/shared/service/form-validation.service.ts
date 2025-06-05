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
      if (!errors.hasUpperCase) messages.push('Mật khẩu phải có ít nhất 1 chữ cái in hoa');
      if (!errors.hasLowerCase) messages.push('Mật khẩu phải có ít nhất 1 chữ cái thường');
      if (!errors.hasNumber) messages.push('Mật khẩu phải có ít nhất 1 số');
      if (!errors.hasSpecialChar) messages.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
      return messages.join(', ');
    }
    return '';
  }
  /**
   * Validator cho kiểu string hợp lệ
   */

  stringValidator(
    options: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
    } = {},
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (options.required && (value == null || value == undefined || value === '')) {
        return { require: { message: 'Trường này là bắt buộc !!!' } };
      }
      if (value == null && value !== undefined && typeof value !== 'string') {
        return { type: { message: 'Giá trị phải là kiểu chuỗi.' } };
      }
      const trimmedValue = value ? value.trim() : '';
      if (options.minLength && trimmedValue.length < options.minLength) {
        return { minLength: { message: `Độ dài tối thiểu là ${options.minLength} ký tự` } };
      }
      if (options.maxLength && trimmedValue.length > options.maxLength) {
        return { maxLength: { message: `Độ dài tối đa là ${options.maxLength} ký tự` } };
      }
      if (options.pattern && !options.pattern.test(trimmedValue)) {
        return { invalidPattern: { message: 'Định dạng không hợp lệ' } };
      }
      return null;
    };
  }

  /**
   * Validator cho kiểu Number
   * - Linh hoạt với các tùy chọn
   */

  numberValidator(
    options: {
      required?: boolean;
      min?: number;
      max?: number;
    } = {},
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (options.required && (value === null || value === undefined)) {
        return { required: { message: 'Trường này là bắt buộc' } };
      }
      const numValue = Number(value);
      if (value !== null && value !== undefined && isNaN(numValue)) {
        return { invalidType: { message: 'Giá trị phải là số' } };
      }
      if (options.min !== undefined && numValue < options.min) {
        return { min: { message: `Giá trị tối thiểu là ${options.min}` } };
      }
      if (options.max !== undefined && numValue > options.max) {
        return { max: { message: `Giá trị tối đa là ${options.max}` } };
      }
      return null;
    };
  }

  /**
   * Validator cho kiểu Boolean
   */
  booleanValidator(options: { required?: boolean } = {}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (options.required && (value === null || value === undefined)) {
        return { required: { message: 'Trường này là bắt buộc' } };
      }
      if (value !== null && value !== undefined && typeof value !== 'boolean') {
        return { invalidType: { message: 'Giá trị phải là boolean' } };
      }
      return null;
    };
  }
  /**
   * Validator cho kiểu Date
   * - Linh hoạt với các tùy chọn ngày
   */
  dateValidator(
    options: {
      required?: boolean;
      allowPast?: boolean;
      allowFuture?: boolean;
    } = {},
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (options.required && (value === null || value === undefined || value === '')) {
        return { required: { message: 'Trường này là bắt buộc' } };
      }
      const date = new Date(value);
      if (value !== null && value !== undefined && isNaN(date.getTime())) {
        return { invalidDate: { message: 'Ngày không hợp lệ' } };
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (options.allowPast === false && date < today) {
        return { pastDate: { message: 'Không cho phép ngày trong quá khứ' } };
      }
      if (options.allowFuture === false && date > today) {
        return { futureDate: { message: 'Không cho phép ngày trong tương lai' } };
      }
      return null;
    };
  }
}
