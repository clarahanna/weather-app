import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})


export class WeatherDataComponent {
  @Input() weatherData: any;
}

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
