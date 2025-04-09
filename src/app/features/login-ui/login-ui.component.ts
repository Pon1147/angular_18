import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { typInfoLarge, typArrowRightThick } from '@ng-icons/typicons';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { emailValidator, passwordValidator } from '../../shared/validator/form-validator';
import { User } from '../../shared/models/user.model';
import { NotificationComponent } from '../../shared/components/notification/notification.component';
import { NotificationService, NotificationVariants } from '../../core/services/notification.services';

@Component({
  selector: 'app-login-ui',
  standalone: true,
  imports: [SharedModule, NgIcon, ReactiveFormsModule, NotificationComponent],
  templateUrl: './login-ui.component.html',
  styleUrl: './login-ui.component.scss',
  viewProviders: [provideIcons({ typInfoLarge, typArrowRightThick })],
})
export class LoginUIComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      email: 'test@example.com',
      password: '19001592Aa@.',
    },
    {
      id: 2,
      email: 'test2@example.com',
      password: 'test456',
    },
  ];

  loginForm!: FormGroup;
  disabled = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly notificationService: NotificationService // Inject NotificationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['test@example.com', [Validators.required, emailValidator()]],
      password: ['19001592Aa@.', [Validators.required, passwordValidator()]],
    });
    this.loginForm.statusChanges.subscribe((status) => {
      this.disabled = status === 'INVALID';
    });
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  get isEmailInvalid(): boolean {
    const emailControl = this.loginForm.get('email');
    if (!emailControl) return false;
    return !emailControl.valid && (emailControl.dirty || emailControl.touched);
  }

  get emailInvalidText(): string {
    const emailControl = this.loginForm.get('email');
    if (!emailControl) return '';
    if (emailControl.hasError('required')) {
      return 'Email là bắt buộc';
    }
    if (emailControl.hasError('invalidEmail')) {
      return 'Email không hợp lệ, vui lòng nhập đúng định dạng (ví dụ: username@ibm.com)';
    }
    return '';
  }

  get isPasswordInvalid(): boolean {
    const passwordControl = this.loginForm.get('password');
    if (!passwordControl) return false;
    return !passwordControl.valid && (passwordControl.dirty || passwordControl.touched);
  }

  get passwordInvalidText(): string {
    const passwordControl = this.loginForm.get('password');
    if (!passwordControl) return '';
    if (passwordControl.hasError('required')) {
      return 'Mật khẩu là bắt buộc';
    }
    if (passwordControl.hasError('invalidPassword')) {
      const errors = passwordControl.errors?.['invalidPassword'];
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

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid. Please check the errors.');
      console.log('Email:', this.email?.value);
      console.log('Password:', this.password?.value);
    } else {
      const matchingUser = this.users.find(
        (user) => user.email === this.email?.value && user.password === this.password?.value
      );
      if (matchingUser) {
        console.log('Welcome Back Admin User:', matchingUser.email);
        this.router.navigate(['/home']);
        this.notificationService.showNotification(NotificationVariants.NOTIFICATION, {
          type: 'success',
          title: 'Success',
          message: 'Đăng nhập thành công',
          showClose: true,
          timeout: 5000
        });
      } else {
        console.log('You log in with Email:', this.email?.value);
        // Hiển thị thông báo lỗi với cấu trúc đúng cho Toast notification
        this.notificationService.showNotification(NotificationVariants.NOTIFICATION, {
          type: 'error',
          title: 'Đăng nhập không thành công',
          message: 'Email hoặc mật khẩu không đúng',
          showClose: true,
          timeout: 5000
        });
      }
    }
  }
}