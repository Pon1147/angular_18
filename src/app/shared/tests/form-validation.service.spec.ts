import { FormValidationService } from '../service/form-validation.service';
import { AbstractControl } from '@angular/forms';

describe('FormValidationService', () => {
  let service: FormValidationService;

  beforeEach(() => {
    service = new FormValidationService();
  });

  describe('emailValidator', () => {
    it('should return null for valid email', () => {
      const control = { value: 'test@example.com' } as unknown as AbstractControl;
      const result = service.emailValidator()(control);
      expect(result).toBeNull();
    });

    it('should return error object for invalid email', () => {
      const control = { value: 'invalid' } as unknown as AbstractControl;
      const result = service.emailValidator()(control);
      expect(result).toEqual({ invalidEmail: true });
    });
  });

  describe('passwordValidator', () => {
    it('should return null for valid password', () => {
      const control = { value: 'Abcdef1@' } as unknown as AbstractControl;
      const result = service.passwordValidator()(control);
      expect(result).toBeNull();
    });

    it('should return errors for invalid password', () => {
      const control = { value: 'abc' } as unknown as AbstractControl;
      const result = service.passwordValidator()(control);
      expect(result).not.toBeNull();
    });
  });
});