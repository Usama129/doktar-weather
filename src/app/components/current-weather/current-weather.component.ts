import {Component, OnInit} from '@angular/core';
import {WeatherDataService} from '../../services/weather-data/weather-data.service';
import {AppStateService} from '../../core/state/app-state.service';

@Component({
  selector: 'app-current-weather',
  imports: [],
  providers: [WeatherDataService],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent implements OnInit {

  constructor(private weatherDataService: WeatherDataService,
              private appStateService: AppStateService) { }

  ngOnInit() {

  }

  getWeather() {
    return this.weatherDataService.weather();
  }

  getIconUrl() {
  }
}
