import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VMUsers } from '../../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: VMUsers = { name: '', username: '', email: '', password: '' };
  authorized: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  addUser() {
    this.userService.addNewUser(this.user).subscribe(
      (response) => {
        console.log('User added successfully:', response);
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error adding user:', error);
        if(error.status == '401'){
          this.authorized = false;
        }
      }
    );
  }
}
