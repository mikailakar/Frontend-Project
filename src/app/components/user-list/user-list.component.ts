import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VMUsers2 } from '../../models/user.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: VMUsers2[] = [];
  authorized: boolean = true;
  filteredUsers: VMUsers2[] = [];
  searchId: number | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().pipe(
      catchError((error) => {
        console.error('Error loading users:', error);
        if(error.status == '401'){
          this.authorized = false;
        }
        return of([]);
      })
    ).subscribe((data) => {
      this.users = data;
    });
  }

  searchUserById() {
    if (this.searchId !== null) {
      this.userService.getUserById(this.searchId).subscribe(
        (user) => {
          this.users = user ? [user] : [];
        },
        (error) => {
          console.error('Error fetching user by ID:', error);
          this.users = [];
        }
      );
    }else{
      this.loadUsers();
    }
  }

  clearSearch() {
    this.searchId = null;
    this.loadUsers();
  }

  navigateToAddUser() {
    this.router.navigate(['add-user']);
  }

  editUser(id: number) {
    this.router.navigate(['/edit-user', id]);
  }

  softDeleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.softDeleteUserById(id).subscribe(
        () => {
          alert('User deleted successfully');
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
