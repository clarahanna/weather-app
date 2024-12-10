import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service'; // Assuming you have a WeatherService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { WeatherDataComponent } from '../weather-data/weather-data.component';
import { error } from 'console';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [FormsModule, CommonModule], 
  standalone: true
})
export class WeatherComponent implements OnInit {
  city: string = '';
  // weatherCondition: string = '';
  @Input() weatherData: any; // Replace any with your actual weather data type
  
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    // You can optionally call detectLocation() here to fetch initial data
    this.detectLocation();
  }

  changeCity(city: string): void {
    this.city = city;
    console.log('City entered:', city);
    this.weatherService.getWeatherByCity(city).pipe(
      catchError(error => {
        console.error('Error fetching weather data:', error);
        return of(null);
      })
    ).subscribe(data => {
      if (data) {
        this.weatherData = data;
      } else {
        this.weatherData = null;
      }
    });
  }

  public detectLocation(): void { // Make sure this is public
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.weatherService.getWeatherByCoordinates(lat, lon).subscribe(data => {
            if (data)  {
              this.weatherData = data;
            }else {
              this.weatherData = null;
            }
        });
      },
      error => {
        console.error('Error getting location', error);
      }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
