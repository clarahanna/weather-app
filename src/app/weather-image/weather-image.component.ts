import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-image',
  imports: [CommonModule],
  templateUrl: './weather-image.component.html',
  styleUrls: ['./weather-image.component.css']
})
export class WeatherImageComponent {
  @Input() weatherCondition: string | undefined;
  
  getWeatherImage(): string {
    if (!this.weatherCondition) {
    return ''; // Return an empty string if no condition is provided
  }
  
  // Map weather conditions to your available image URLs
  const images: { [key: string]: string } = {
    'clear sky': 'assets/images/sun.png', // Assuming clear sky means sunny
    'few clouds': 'assets/images/cloudy.png',
    'scattered clouds': 'assets/images/cloudy.png',
    'broken clouds': 'assets/images/cloudy.png',
    'shower rain': 'assets/images/rainy.png',
    'rain': 'assets/images/rainy.png',
    'thunderstorm': 'assets/images/rainy.png', // You can choose to show rainy for thunderstorms
    'snow': 'assets/images/cloudy.png', // You can use cloudy for snow as well
    'mist': 'assets/images/cloudy.png', // Mist can also be represented as cloudy
    'night': 'assets/images/moon.png', // You can define night conditions if needed
    // Add more conditions as needed
  };

  return images[this.weatherCondition] || 'assets/images/cloudy.png'; // Default to cloudy if condition not matched
}
}