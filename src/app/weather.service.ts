import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey='02b6845c6164c9d68eb07e22d2194f59';

  constructor(private http:HttpClient) { }

  getWeather(city:string){
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q={city}&appid={this.apiKey}');
  }
}
