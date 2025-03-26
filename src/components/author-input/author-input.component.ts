import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Author } from '../author-list/author-list.component';
import { SharedModule } from '../../share/shared.module';


@Component({
  selector: 'app-author-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SharedModule],
  templateUrl: './author-input.component.html',
  styleUrl: './author-input.component.scss',
})
export class AuthorInputComponent implements OnInit {
  // Input property to receive data from the parent component
  @Input() author: Author = {
    id: 0,
    firstName: '',
    lastName: '',
  };

  // Output property to emit data to the parent component
  @Output() authorAdd = new EventEmitter<Author>();

  // Reactive form group for the input form
  authorInputForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form group with validation rules
    this.authorInputForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.alphaOnlyValidator, // Custom validator for alphabet-only input
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.alphaOnlyValidator, // Custom validator for alphabet-only input
        ],
      ],
    });
  }

  ngOnInit(): void {
    // Lifecycle hook: Runs when the component is initialized
    console.log('AuthorInputComponent initialized');
  }

  // Custom validator to ensure the input contains only alphabetic characters
  private alphaOnlyValidator(control: AbstractControl): Record<string, boolean> | null {
    const value = control.value?.trim(); // Trim whitespace
    if (!value) return null; // If no value, let the required validator handle it
    const alphaOnly = /^[a-zA-Z]+$/; // Regex for alphabetic characters only
    return alphaOnly.test(value) ? null : { alphaOnly: true }; // Return error if invalid
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.authorInputForm.invalid) {
      console.log('Form errors:', this.authorInputForm.errors);
      console.log('First Name errors:', this.firstName?.errors);
      console.log('Last Name errors:', this.lastName?.errors);

      // this.authorInputForm.markAllAsTouched();
      // console.log('Form is invalid. Please check the errors.');
      return;
    }

    const formValue = this.authorInputForm.value;
    const newAuthor: Author = {
      id: 0,
      firstName: formValue.firstName.trim(),
      lastName: formValue.lastName.trim(),
    };

    this.authorAdd.emit(newAuthor);
    this.authorInputForm.reset();
    console.log('Author submitted successfully:', newAuthor);
  }

  // Method to handle the "Submit" button click
  onSubmitClick(): void {
    console.log('Submit button clicked');
    this.onSubmit(); // Call the same logic as (ngSubmit)
  }

  // Getter for the firstName form control
  get firstName() {
    return this.authorInputForm.get('firstName');
  }

  // Getter for the lastName form control
  get lastName() {
    return this.authorInputForm.get('lastName');
  }
}
