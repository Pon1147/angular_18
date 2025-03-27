import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator cho email: kiểm tra định dạng email hợp lệ
 */
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailPattern.test(control.value);
    return valid ? null : { invalidEmail: true };
  };
}

/**
 * Validator cho password: tối thiểu 12 ký tự, phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt
 */
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const minLength = value.length >= 9;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    return valid ? null : { invalidPassword: { minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } };
  };
}
