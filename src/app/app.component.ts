import { Component, ViewChild } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { WeatherComponent } from "./weather/weather.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { WeatherImageComponent } from "./weather-image/weather-image.component";
import { WeatherDataComponent } from "./weather-data/weather-data.component";
import { WeatherService } from './weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WeatherMain { 
  temp: number; 
  humidity: number; 
  temp_min: number; 
  temp_max: number; 
} 
interface WeatherDescription { 
  description: string; 
  icon: string; 
} 
interface WeatherWind { 
  speed: number; 
} 
interface WeatherData { 
  main: WeatherMain; 
  weather: WeatherDescription[]; 
  wind: WeatherWind; 
  name: string; 
}


@Component({
  selector: 'app-root',
  imports: [WeatherComponent, SearchBarComponent, WeatherImageComponent, 
    WeatherDataComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})

export class AppComponent {
  city: string = '';
  weatherCondition: string | undefined;
  weatherData: WeatherData | null = null;
  isLoading = false;
  hasError = false;
  errorMessage = '';
  apiKey='02b6845c6164c9d68eb07e22d2194f59';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={this.apiKey}'


  constructor(private weatherService: WeatherService) {}

  ngOnInit() { 
    this.detectLocation(); 
  }

  onCitySearch(city: string): void { 
    this.getWeatherByCity(city); 
  }

  changeCity(city: string): void {
    this.city = city;
    // console.log('City:', city);
    this.getWeatherByCity(city);
  }

  getWeatherByCity(city: string): void {
    this.isLoading = true;
    this.hasError = false;

    this.weatherService.getWeatherByCity(city).pipe(
      catchError(error => {
        console.error('Error fetching weather data:', error);
        this.hasError = true;
        this.errorMessage = 'Failed to fetch weather data';
        this.isLoading = false;
        return of({ error: 'Failed to fetch weather data' });
      })
    ).subscribe(data => {
      this.isLoading = false; 
      if (this.isWeatherData(data)) { 
        this.weatherData = data; 
        // this.weatherCondition = this.weatherData.weather[0].description; 
      } else { 
        this.weatherData = null; 
        this.hasError = true; 
        this.errorMessage = 'Failed to fetch weather data'; 
      } 
    }); 
  }

  detectLocation(): void {
    if (navigator.geolocation) {
      this.isLoading = true;
      this.hasError = false;

      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.getWeatherByCoordinates(latitude, longitude);
        },
        error => {
          console.error('Error getting location:', error);
          this.isLoading = false; // Hide loading indicator on error
          this.hasError = true;
          this.errorMessage = 'Error getting location'; // Generic error message
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.hasError = true;
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  getWeatherByCoordinates(latitude: number, longitude: number): void {
    this.weatherService.getWeatherByCoordinates(latitude, longitude).pipe(
      catchError(error => {
        console.error('Error fetching weather data:', error);
        this.hasError = true;
        this.errorMessage = 'Failed to fetch weather data';
        this.isLoading = false;
        return of({error: 'Failed to fetch weather data' });
      })
    ).subscribe(data => {
      this.isLoading = false;
      if (this.isWeatherData(data)) { 
        this.weatherData = data; 
        // this.weatherCondition = this.weatherData.weather[0].description; 
      } else { 
        this.weatherData = null; 
        this.hasError = true; 
        this.errorMessage = 'Failed to fetch weather data'; 
      } 
      }); 
    }

    // Type guard to check if data is of type WeatherData 
    private isWeatherData(data: any): data is WeatherData {
       return data && data.main && data.weather && data.wind && data.name; 
      } }


