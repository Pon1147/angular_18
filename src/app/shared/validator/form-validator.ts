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
    return valid
      ? null
      : { invalidPassword: { minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } };
  };
}

/**
 * Validator cho kiểu string hợp lệ
 */

export function stringValidator(
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
      return { minLength: { message: `Dộ dài tối thiểu là ${options.minLength} ký tự` } };
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

export function numberValidator(
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
export function booleanValidator(options: { required?: boolean } = {}): ValidatorFn {
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
export function dateValidator(
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