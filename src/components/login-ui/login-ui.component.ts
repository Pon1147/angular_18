import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../share/shared.module';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { typInfoLarge, typArrowRightThick } from '@ng-icons/typicons';
import {

  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { emailValidator, passwordValidator } from '../../share/login-validation';

export interface User {
  id: number;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-ui',
  standalone: true,
  imports: [SharedModule, NgIcon, ReactiveFormsModule],
  templateUrl: './login-ui.component.html',
  styleUrl: './login-ui.component.scss',
  viewProviders: [provideIcons({ typInfoLarge, typArrowRightThick })]
})

export class LoginUIComponent implements OnInit {
  users: User[] = [{
    id: 1,
    email: 'test@example.com',
    password: '19001592Aa@.'
  },
  {
    id: 2,
    email: 'test2@example.com',
    password: 'test456'
  }];

  loginForm!: FormGroup;
  disabled = true;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
    });
    this.loginForm.statusChanges.subscribe((status) => {
      this.disabled = status === 'INVALID';
    });
  }
  //   // Subscribe to form status changes to update the disabled property
  //   subscribe((status: string): void => {
  //     this.disabled = status === 'INVALID';
  //     });
  // }

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
      console.log('Email is invalid. Please check the', this.email?.value);
      console.log('Password is invalid. Please check the', this.password?.value);
    } else {
      const matchingUser = this.users.find(user => user.email === this.email?.value && user.password === this.password?.value);
      if (matchingUser) {
        console.log('Welcom Back Admin User: ', matchingUser.email);
      } else {
        console.log('You log in with Email: ' + this.email?.value);
      }
    }
  }
}
