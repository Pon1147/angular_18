// src/app/login-ui.component.ts
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
import { User } from '../../shared/models/user.model';
import { NotificationComponent } from '../../shared/components/notification/notification.component';
import { NotificationService, NotificationVariants } from '../../core/services/notification.services';
import { FormValidationService } from '../../shared/service/form-validation.service';

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
    { id: 1, email: 'test@example.com', password: '19001592Aa@.' },
    { id: 2, email: 'test2@example.com', password: 'test456' },
  ];

  loginForm!: FormGroup;
  disabled = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['test@example.com', [Validators.required, this.formValidationService.emailValidator()]],
      password: ['19001592Aa@.', [Validators.required, this.formValidationService.passwordValidator()]],
    });

    // Đảm bảo form không hiển thị lỗi ngay khi khởi tạo
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();

    // Cập nhật trạng thái disabled của nút đăng nhập dựa trên trạng thái form
    this.disabled = this.loginForm.invalid;

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
    return this.formValidationService.isInvalid(this.email);
  }

  get emailInvalidText(): string {
    return this.formValidationService.getEmailErrorMessage(this.email);
  }

  get isPasswordInvalid(): boolean {
    return this.formValidationService.isInvalid(this.password);
  }

  get passwordInvalidText(): string {
    return this.formValidationService.getPasswordErrorMessage(this.password);
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
          timeout: 5000,
        });
      } else {
        console.log('You log in with Email:', this.email?.value);
        this.notificationService.showNotification(NotificationVariants.NOTIFICATION, {
          type: 'error',
          title: 'Đăng nhập không thành công',
          message: 'Email hoặc mật khẩu không đúng',
          showClose: true,
          timeout: 5000,
        });
      }
    }
  }
  onSoftlayerLogin(): void {
    console.log('Navigating to Softlayer login page...');
    this.router.navigate(['/softlayer-login']);
  }
}