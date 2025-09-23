import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import {SearchLocationComponent} from './components/search-location/search-location.component';
import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';
import {FiveDayForecastComponent} from './components/five-day-forecast/five-day-forecast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SearchLocationComponent, CurrentWeatherComponent, FiveDayForecastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('doktar-weather');
}
