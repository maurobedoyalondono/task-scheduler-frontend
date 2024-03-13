import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserAuthenticationService } from '../services/user-authentication.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  emailForm: FormGroup;
  userEmail: string = '';  
  errorLoggingIn: boolean = false;

  constructor(private authService: UserAuthenticationService, private router: Router, private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      ]]
    });
  }

  ngOnInit(): void {
    if (this.userExists()) {
      this.router.navigate(['/tasks']);
    }
  }

  get email() {
    return this.emailForm.get('email');
  }

  userExists(): boolean {
    return this.authService.getUserId() != null;
  }

  loginUser(event: Event): void {
    event.preventDefault();

    if (this.emailForm.valid) {
      const emailInput = (event.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;

      this.errorLoggingIn = false;

      this.authService.loginUser(emailInput.value).subscribe({
        next: () => {
          console.log('User logged in successfully.');
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorLoggingIn = true;
        }
      });
    }
  }
}
