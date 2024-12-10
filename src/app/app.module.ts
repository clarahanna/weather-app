import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from "./app.component";
//import { HttpClientModule } from "@angular/common/http";
import { WeatherComponent } from "./weather/weather.component";
import { WeatherService } from "./weather.service";
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WeatherImageComponent } from './weather-image/weather-image.component';
import { WeatherDataComponent } from './weather-data/weather-data.component';
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
    providers: [
      provideHttpClient(),
    ]
  };
  
  bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));

@NgModule({
    declarations:[
        AppComponent,
        SearchBarComponent,
        WeatherImageComponent,
        WeatherDataComponent,
        WeatherComponent
    ],
    imports: [
        BrowserModule,
        //HttpClientModule,
        AppComponent,
        WeatherComponent,
        FormsModule,
    ],
    providers: [WeatherService],
    bootstrap: [AppComponent]
})
export class AppModule {}