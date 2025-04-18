import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { FormValidationService } from '../service/form-validation.service';

// Nhóm các test liên quan đến FormValidationService
describe('FormValidationService', () => {
  let service: FormValidationService;

  // Thiết lập môi trường test trước mỗi test case
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValidationService],
    });
    service = TestBed.inject(FormValidationService);
  });

  // Test khởi tạo service
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test emailValidator
  describe('emailValidator', () => {
    let control: FormControl;

    beforeEach(() => {
      control = new FormControl('');
    });

    it('should return null for valid email', () => {
      control.setValue('test@ibm.com');
      const result = service.emailValidator()(control);
      expect(result).toBeNull();
    });

    it('should return invalidEmail error for invalid email', () => {
      control.setValue('invalid.email');
      const result = service.emailValidator()(control);
      expect(result).toEqual({ invalidEmail: true });
    });

    it('should return invalidEmail error for empty email', () => {
      control.setValue('');
      const result = service.emailValidator()(control);
      expect(result).toEqual({ invalidEmail: true });
    });
  });

  // Test passwordValidator
  describe('passwordValidator', () => {
    let control: FormControl;

    beforeEach(() => {
      control = new FormControl('');
    });

    it('should return null for valid password', () => {
      control.setValue('Password123!');
      const result = service.passwordValidator()(control);
      expect(result).toBeNull();
    });

    it('should return invalidPassword error for password missing requirements', () => {
      control.setValue('pass');
      const result = service.passwordValidator()(control);
      expect(result).toEqual({
        invalidPassword: {
          minLength: false,
          hasUpperCase: false,
          hasLowerCase: true,
          hasNumber: false,
          hasSpecialChar: false,
        },
      });
    });

    it('should return invalidPassword error for empty password', () => {
      control.setValue('');
      const result = service.passwordValidator()(control);
      expect(result).toEqual({ invalidPassword: true });
    });
  });

  // Test isInvalid
  describe('isInvalid', () => {
    it('should return false for null control', () => {
      const result = service.isInvalid(null);
      expect(result).toBe(false);
    });

    it('should return true for invalid touched control', () => {
      const control = new FormControl('', { validators: service.emailValidator() });
      control.markAsTouched();
      const result = service.isInvalid(control);
      expect(result).toBe(true);
    });

    it('should return false for valid untouched control', () => {
      const control = new FormControl('test@ibm.com', { validators: service.emailValidator() });
      const result = service.isInvalid(control);
      expect(result).toBe(false);
    });
  });

  // Test getEmailErrorMessage
  describe('getEmailErrorMessage', () => {
    it('should return empty string for null control', () => {
      const result = service.getEmailErrorMessage(null);
      expect(result).toBe('');
    });

    it('should return required message for required error', () => {
      const control = new FormControl('', { validators: [service.emailValidator()] });
      control.setErrors({ required: true });
      const result = service.getEmailErrorMessage(control);
      expect(result).toBe('Email là bắt buộc');
    });

    it('should return invalid email message for invalidEmail error', () => {
      const control = new FormControl('invalid', { validators: service.emailValidator() });
      control.setErrors({ invalidEmail: true });
      const result = service.getEmailErrorMessage(control);
      expect(result).toBe(
        'Email không hợp lệ, vui lòng nhập đúng định dạng (ví dụ: username@ibm.com)',
      );
    });
  });

  // Test getPasswordErrorMessage
  describe('getPasswordErrorMessage', () => {
    it('should return empty string for null control', () => {
      const result = service.getPasswordErrorMessage(null);
      expect(result).toBe('');
    });

    it('should return required message for required error', () => {
      const control = new FormControl('', { validators: [service.passwordValidator()] });
      control.setErrors({ required: true });
      const result = service.getPasswordErrorMessage(control);
      expect(result).toBe('Mật khẩu là bắt buộc');
    });

    it('should return detailed message with <br>- for invalidPassword error', () => {
      const control = new FormControl('pass', { validators: service.passwordValidator() });
      control.setErrors({
        invalidPassword: {
          minLength: false,
          hasUpperCase: false,
          hasLowerCase: true,
          hasNumber: false,
          hasSpecialChar: false,
        },
      });
      const result = service.getPasswordErrorMessage(control);
      expect(result).toBe(
        '- Mật khẩu phải có ít nhất 9 ký tự<br>- ' +
          'Mật khẩu phải có ít nhất 1 chữ cái in hoa<br>- ' +
          'Mật khẩu phải có ít nhất 1 số<br>- ' +
          'Mật khẩu phải có ít nhất 1 ký tự đặc biệt',
      );
    });
  });

  // Test stringValidator
  describe('stringValidator', () => {
    let control: FormControl;

    beforeEach(() => {
      control = new FormControl('');
    });

    it('should return null for valid string with required option', () => {
      control.setValue('test');
      const result = service.stringValidator({ required: true })(control);
      expect(result).toBeNull();
    });

    it('should return require error for empty string with required option', () => {
      control.setValue('');
      const result = service.stringValidator({ required: true })(control);
      expect(result).toEqual({ require: { message: 'Trường này là bắt buộc !!!' } });
    });

    it('should return minLength error for string too short', () => {
      control.setValue('ab');
      const result = service.stringValidator({ minLength: 3 })(control);
      expect(result).toEqual({ minLength: { message: 'Dộ dài tối thiểu là 3 ký tự' } });
    });

    it('should return maxLength error for string too long', () => {
      control.setValue('abcde');
      const result = service.stringValidator({ maxLength: 4 })(control);
      expect(result).toEqual({ maxLength: { message: 'Độ dài tối đa là 4 ký tự' } });
    });

    it('should return invalidPattern error for string not matching pattern', () => {
      control.setValue('abc123');
      const result = service.stringValidator({ pattern: /^[a-z]+$/ })(control);
      expect(result).toEqual({ invalidPattern: { message: 'Định dạng không hợp lệ' } });
    });
  });

  // Test numberValidator
  describe('numberValidator', () => {
    let control: FormControl;

    beforeEach(() => {
      control = new FormControl('');
    });

    it('should return null for valid number', () => {
      control.setValue(10);
      const result = service.numberValidator({ min: 0, max: 100 })(control);
      expect(result).toBeNull();
    });

    it('should return required error for null with required option', () => {
      control.setValue(null);
      const result = service.numberValidator({ required: true })(control);
      expect(result).toEqual({ required: { message: 'Trường này là bắt buộc' } });
    });

    it('should return invalidType error for non-number', () => {
      control.setValue('abc');
      const result = service.numberValidator()(control);
      expect(result).toEqual({ invalidType: { message: 'Giá trị phải là số' } });
    });

    it('should return min error for number too small', () => {
      control.setValue(5);
      const result = service.numberValidator({ min: 10 })(control);
      expect(result).toEqual({ min: { message: 'Giá trị tối thiểu là 10' } });
    });

    it('should return max error for number too large', () => {
      control.setValue(150);
      const result = service.numberValidator({ max: 100 })(control);
      expect(result).toEqual({ max: { message: 'Giá trị tối đa là 100' } });
    });
  });

  // Test booleanValidator
  describe('booleanValidator', () => {
    let control: FormControl;

    beforeEach(() => {
      control = new FormControl('');
    });

    it('should return null for valid boolean', () => {
      control.setValue(true);
      const result = service.booleanValidator()(control);
      expect(result).toBeNull();
    });

    it('should return required error for null with required option', () => {
      control.setValue(null);
      const result = service.booleanValidator({ required: true })(control);
      expect(result).toEqual({ required: { message: 'Trường này là bắt buộc' } });
    });

    it('should return invalidType error for non-boolean', () => {
      control.setValue('true');
      const result = service.booleanValidator()(control);
      expect(result).toEqual({ invalidType: { message: 'Giá trị phải là boolean' } });
    });
  });

  // Test dateValidator
  describe('dateValidator', () => {
    let control: FormControl;

    beforeEach(() => {
      control = new FormControl('');
    });

    it('should return null for valid date', () => {
      control.setValue('2025-04-17');
      const result = service.dateValidator()(control);
      expect(result).toBeNull();
    });

    it('should return required error for null with required option', () => {
      control.setValue(null);
      const result = service.dateValidator({ required: true })(control);
      expect(result).toEqual({ required: { message: 'Trường này là bắt buộc' } });
    });

    it('should return invalidDate error for invalid date', () => {
      control.setValue('invalid');
      const result = service.dateValidator()(control);
      expect(result).toEqual({ invalidDate: { message: 'Ngày không hợp lệ' } });
    });

    it('should return pastDate error for past date when not allowed', () => {
      control.setValue('2023-01-01');
      const result = service.dateValidator({ allowPast: false })(control);
      expect(result).toEqual({ pastDate: { message: 'Không cho phép ngày trong quá khứ' } });
    });

    it('should return futureDate error for future date when not allowed', () => {
      control.setValue('2026-01-01');
      const result = service.dateValidator({ allowFuture: false })(control);
      expect(result).toEqual({ futureDate: { message: 'Không cho phép ngày trong tương lai' } });
    });
  });
});
