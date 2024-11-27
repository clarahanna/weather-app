import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  city: string ="London";

  constructor(){}

  ngOnInit(){
    this.weatherData = {
      main: {},
      isDay: true
    };
    this.getWeatherData(this.city);
    console.log(this.weatherData);
  }

 getWeatherData(city:string) {
  const apiKey = '53426a1639d6cd40d302a99a96c01ed3'; // Your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('City not found');
    }
    return response.json();
  })
  .then(data => {
    this.setWeatherData(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    alert('City not found, please try again.');
  
  });
  }

  setWeatherData(data: any){
    this.weatherData = data;
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime()< sunsetTime.getTime());
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.temp_feels_like - 273.15);
  }
  changeCity(newCity: string) {
    this.city = newCity;
    this.getWeatherData(this.city);
  }
}