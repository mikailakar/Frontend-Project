import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserWithRoleDto } from '../../models/user.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.css'
})
export class UserRoleComponent implements OnInit {
  users: UserWithRoleDto[] = [];
  filteredUsers: UserWithRoleDto[] = [];
  searchId: number | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsersWithRoles().pipe(
      catchError((error) => {
        console.error('Error loading users:', error);
        return of([]);
      })
    ).subscribe((data) => {
      this.users = data;
    });
  }

  searchUserById() {
    if (this.searchId !== null) {
      this.userService.getUserWithRoleById(this.searchId).subscribe(
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
}
