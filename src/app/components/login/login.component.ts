import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // To redirect user after login
import { UserService } from '../../services/user.service';  // Import your UserService
import { AuthenticateRequest } from '../../models/user.model';  // Import AuthenticateRequest model
import { AuthenticateResponse } from '../../models/user.model';  // Import AuthenticateResponse model

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const loginData: AuthenticateRequest = this.loginForm.value;
    this.userService.authenticate(loginData).subscribe({
      next: (response: AuthenticateResponse) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
