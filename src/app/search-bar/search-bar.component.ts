import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: 
  `
   <div class="search-bar">
      <input
        type="text"
        [(ngModel)]="searchTerm"
        placeholder="Enter city name"
        (keyup.enter)="onSearch()"
      />
      <button (click)="onSearch('location')">Get Weather</button>
    </div>
  `,
  //templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();
  city:string = '';
  
  onSearch(locationType?: string) {
    if (this.searchTerm) {
        // Emit the city name for weather by city search
        this.searchTermChange.emit(this.searchTerm);
        this.searchTerm = ''; // Clear the input after search
      }
    }
  }

