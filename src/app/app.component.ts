import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherComponent } from "./weather/weather.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'weatherApp';
weatherComponent: any;
}
