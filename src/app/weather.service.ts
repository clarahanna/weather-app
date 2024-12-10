import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError, of } from 'rxjs';
import { environment } from '../environments/environment';

interface  WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  lowestTemp: number;
  highestTemp: number;
  condition: string;
}


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey='02b6845c6164c9d68eb07e22d2194f59';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http:HttpClient) { }


  getWeatherByCity(city: string): Observable<WeatherData | { error: string }> {
    return this.http.get<WeatherData>(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`)
      .pipe(
        catchError(error => {
          console.error('Error fetching weather data:', error);
          return of({ error: 'Failed to fetch weather data' });
        })
      );
  }

  // Function to get weather data by coordinates (latitude and longitude)
  getWeatherByCoordinates(latitude: number, longitude: number): Observable<WeatherData | { error: string }> {
    return this.http.get<WeatherData>(`${this.apiUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`)
      .pipe(
        catchError(error => {
          console.error('Error fetching weather data:', error);
          return of({ error: 'Failed to fetch weather data' });
        })
      );
  }
}
