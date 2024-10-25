import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes-demo',
  templateUrl: './pipes-demo.component.html',
  styleUrls: ['./pipes-demo.component.css']
})
export class PipesDemoComponent {
  items = [
    { name: 'John Doe', currency: 1500.50, date: new Date() },
    { name: 'Jane Smith', currency: 2500.75, date: new Date(2022, 5, 10) },
    { name: 'Jack Johnson', currency: 300, date: new Date(2023, 0, 1) },
    { name: 'Alice Brown', currency: 12345.67, date: new Date(2024, 10, 25) }
  ];
}
