import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VMUsers2 } from '../../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId!: number;
  user: VMUsers2 = { id: 0, name: '', username: '', email: '' };
  authorized: boolean = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user details:', error);
        if(error.status == '401'){
          this.authorized = false;
        }
      }
    );
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.user).subscribe(
      () => {
        alert('User updated successfully!');
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error updating user:', error);
        if(error.status == '401'){
          this.authorized = false;
        }
      }
    );
  }
}
