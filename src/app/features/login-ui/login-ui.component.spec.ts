import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginUIComponent } from './login-ui.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconService, NotificationService } from 'carbon-components-angular';
import { FormValidationService } from '../../shared/service/form-validation.service';
import { SharedModule } from '../../shared/shared.module';
import { AbstractControl, ValidationErrors } from '@angular/forms';

describe('LoginUIComponent', () => {
  let component: LoginUIComponent;
  let fixture: ComponentFixture<LoginUIComponent>;
  let router: Router;
  let notificationService: NotificationService;

  // Mock services
  const routerMock = {
    navigate: jest.fn(),
  };
  const formValidationServiceMock = {
    emailValidator: jest.fn(() => (control: AbstractControl): ValidationErrors | null => {
      if (!control || control.value === undefined || control.value === null) {
        return { invalidEmail: true };
      }
      return control.value.includes('@') ? null : { invalidEmail: true };
    }),
    passwordValidator: jest.fn(() => (control: AbstractControl): ValidationErrors | null => {
      if (!control || control.value === undefined || control.value === null) {
        return { invalidPassword: true };
      }
      return control.value.length >= 8 ? null : { invalidPassword: true };
    }),
    isInvalid: jest.fn(control => !!control?.errors),
    getEmailErrorMessage: jest.fn(() => 'Invalid email format'),
    getPasswordErrorMessage: jest.fn(() => 'Password does not meet requirements'),
  };
  const notificationServiceMock = {
    showNotification: jest.fn(),
  };

  // Setup before each test
  beforeEach(async () => {
    const iconServiceMock = {
      registerAll: jest.fn(),
      register: jest.fn(),
      get: jest.fn().mockReturnValue({}),
      registerAs: jest.fn(),
      unregister: jest.fn(),
      getRegisteredIcons: jest.fn().mockReturnValue([]),
    };
    await TestBed.configureTestingModule({
      imports: [LoginUIComponent, SharedModule, BrowserAnimationsModule],
      providers: [
        { provide: IconService, useValue: iconServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: FormValidationService, useValue: formValidationServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginUIComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges(); // Trigger initial data binding
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with default values', () => {
      expect(component.loginForm.get('email')?.value).toBe('test@example.com');
      expect(component.loginForm.get('password')?.value).toBe('19001592Aa@.');
    });
  });

  describe('Form Validation', () => {
    it('should validate email format', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalid-email');
      fixture.detectChanges();
      expect(component.isEmailInvalid).toBe(true);
      emailControl?.setValue('test@example.com');
      fixture.detectChanges();
      expect(component.isEmailInvalid).toBe(false);
    });

    it('should validate password requirements', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('weak');
      fixture.detectChanges();
      expect(component.isPasswordInvalid).toBe(true);
      passwordControl?.setValue('19001592Aa@.');
      fixture.detectChanges();
      expect(component.isPasswordInvalid).toBe(false);
    });

    it('should mark email as invalid when empty', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('');
      fixture.detectChanges();
      expect(component.isEmailInvalid).toBe(true);
    });

    it('should mark password as invalid when empty', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('');
      fixture.detectChanges();
      expect(component.isPasswordInvalid).toBe(true);
    });
  });

  describe('Form Submission', () => {
    it('should show error notification for invalid form and not auto-close', fakeAsync(() => {
      component.loginForm.controls['email'].setValue('invalid');
      component.loginForm.controls['password'].setValue('weak');
      component.onSubmit();
      expect(notificationService.showNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Đăng nhập thất bại',
        message: 'Vui lòng kiểm tra email hoặc mật khẩu.',
        showClose: true,
        lowContrast: false,
      });
      expect(router.navigate).not.toHaveBeenCalled();
      tick(5000); // Simulate 5 seconds
      expect(notificationService.showNotification).toHaveBeenCalledTimes(1);
    }));

    it('should navigate to home and reset form on successful login', () => {
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('19001592Aa@.');
      component.onSubmit();
      expect(notificationService.showNotification).not.toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      expect(component.loginForm.get('email')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
    });

    it('should show error notification when email is empty and not auto-close', fakeAsync(() => {
      component.loginForm.controls['email'].setValue('');
      component.loginForm.controls['password'].setValue('19001592Aa@.');
      component.onSubmit();
      expect(notificationService.showNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Đăng nhập thất bại',
        message: 'Vui lòng kiểm tra email hoặc mật khẩu.',
        showClose: true,
        lowContrast: false,
      });
      expect(router.navigate).not.toHaveBeenCalled();
      tick(5000); // Simulate 5 seconds
      expect(notificationService.showNotification).toHaveBeenCalledTimes(1);
    }));

    it('should show error notification when password is empty and not auto-close', fakeAsync(() => {
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('');
      component.onSubmit();
      expect(notificationService.showNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Đăng nhập thất bại',
        message: 'Vui lòng kiểm tra email hoặc mật khẩu.',
        showClose: true,
        lowContrast: false,
      });
      expect(router.navigate).not.toHaveBeenCalled();
      tick(5000); // Simulate 5 seconds
      expect(notificationService.showNotification).toHaveBeenCalledTimes(1);
    }));

    it('should show error notification when both email and password are empty and not auto-close', fakeAsync(() => {
      component.loginForm.controls['email'].setValue('');
      component.loginForm.controls['password'].setValue('');
      component.onSubmit();
      expect(notificationService.showNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Đăng nhập thất bại',
        message: 'Vui lòng kiểm tra email hoặc mật khẩu.',
        showClose: true,
        lowContrast: false,
      });
      expect(router.navigate).not.toHaveBeenCalled();
      tick(5000); // Simulate 5 seconds
      expect(notificationService.showNotification).toHaveBeenCalledTimes(1);
    }));
  });

  describe('Navigation', () => {
    it('should navigate to softlayer login page', () => {
      component.onSoftlayerLogin();
      expect(router.navigate).toHaveBeenCalledWith(['/softlayer-login']);
      expect(notificationService.showNotification).not.toHaveBeenCalled();
    });
  });
});