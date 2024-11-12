import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserWithRoleDto } from '../../models/user.model';


@Component({
  selector: 'app-decode-jwt',
  templateUrl: './decode-jwt.component.html',
  styleUrl: './decode-jwt.component.css'
})
export class DecodeJwtComponent {
  token: string = '';
  decodedToken: any = null;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  decodeToken() {
    if (this.token) {
      const cleanToken = this.token.startsWith('Bearer ') ? this.token.substring(7) : this.token;
      this.userService.decodeJwtToken(cleanToken).subscribe({
        next: (data) => {
          this.decodedToken = data;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Failed to decode the token. Please ensure it is valid.';
          this.decodedToken = null;
        }
      });
    } else {
      this.errorMessage = 'Please enter a JWT token';
      this.decodedToken = null;
    }
  }
}
