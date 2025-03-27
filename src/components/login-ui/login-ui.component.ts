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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted successfully:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid. Please check the errors.');
      console.log('Email is invalid. Please check the', this.email?.value);
      console.log('Password is invalid. Please check the', this.password?.value);
    }
  }
}
