import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../share/shared.module';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { typInfoLarge, typArrowRightThick } from '@ng-icons/typicons';
import {

  ReactiveFormsModule,

} from '@angular/forms';


export interface User {
  id: number;
  emailUse: string;
  passwordUser: string;
}
@Component({
  selector: 'app-login-ui',
  standalone: true,
  imports: [SharedModule, NgIcon, ReactiveFormsModule],
  templateUrl: './login-ui.component.html',
  styleUrl: './login-ui.component.scss',
  viewProviders: [provideIcons({ typInfoLarge, typArrowRightThick })]
})
export class LoginUIComponent{

  // userInputForm!: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.userInputForm = this.fb.group({
  //     emailUser: ['', // khai báo control email và Validations của email
  //       [
  //         Validators.required,
  //         Validators.email,
  //         Validators.minLength(5),
  //         Validators.maxLength(50),
  //       ]
  //     ],
  //     passwordUser: ['', // khai báo control password và Validations cuar password
  //       [
  //         Validators.required,
  //         Validators.minLength(8),
  //         Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
  //         Validators.maxLength(50),
  //       ]],
  //   });

  // } ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngOnSubmit(): void {
  //   if (this.userInputForm.invalid) {
  //     console.log('User Name Error:', this.emailUser?.errors);
  //     console.log('User Password Error:', this.passwordUser?.errors);
  //     this.userInputForm.markAllAsTouched();
  //     return;
  //   }
  //   const formValue = this.userInputForm.value;
  //   const inforUser: User = {
  //     id: 0,
  //     emailUse: formValue.emailUser.trim(),
  //     passwordUser: formValue.passwordUser.trim(),
  //   };

  // }
}
