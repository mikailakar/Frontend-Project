import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-date',
  templateUrl: './user-date.component.html',
  styleUrl: './user-date.component.css'
})
export class UserDateComponent implements OnInit {
  users: Users[] = [];
  filteredUsers: Users[] = [];
  searchId: number | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsersOrderByDate().pipe(
      catchError((error) => {
        console.error('Error loading users:', error);
        return of([]);
      })
    ).subscribe((data) => {
      this.users = data;
    });
  }
}
