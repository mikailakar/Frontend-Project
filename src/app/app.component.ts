import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface Notification {
  id: number;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notificationMessage: string = '';
  showNotification: boolean = false;
  private notificationTimeout: any;
  private hideTimeout: any;
  isDarkMode: boolean = false;
  logedin: boolean = false;
  token: string = '';
  mainpage: boolean = true;

  constructor(
    private router: Router,
    private renderer: Renderer2) {
    }

  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const taketoken = localStorage.getItem('authToken');
      this.token = taketoken ? taketoken : '';
      if(this.token != ''){
        this.logedin = true;
      }
      this.mainpage = this.router.url === '/';
    });
  }
  
  logout() {
    localStorage.removeItem('authToken');
    this.logedin = false;
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

  createNotification(message: string): void {
    this.showNotification = false;
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    this.hideTimeout = setTimeout(() => {
      this.notificationMessage = message;
      this.showNotification = true;
      this.notificationTimeout = setTimeout(() => {
        this.showNotification = false;
      }, 2000);
    }, 50);
  }
}
