import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./dashboard/header/header.component";
import {SearchLocationComponent} from './dashboard/search-location/search-location.component';
import {CurrentWeatherComponent} from './dashboard/current-weather/current-weather.component';
import {FiveDayForecastComponent} from './dashboard/five-day-forecast/five-day-forecast.component';
import {
  TwentyfourHourForecastComponent
} from './dashboard/twentyfour-hour-forecast/twentyfour-hour-forecast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SearchLocationComponent, CurrentWeatherComponent, FiveDayForecastComponent, TwentyfourHourForecastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('doktar-weather');
}
