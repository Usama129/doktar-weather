import {Component} from '@angular/core';
import {WeatherDataService} from '../../services/weather-data/weather-data.service';
import {WeatherDataResponseDto} from '../../services/weather-data/weather-data.dto';
import {AppStateService} from '../../core/state/app-state.service';

@Component({
  selector: 'current-weather',
  imports: [],
  providers: [],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent {

  constructor(private weatherDataService: WeatherDataService,
              private appStateService: AppStateService) { }

  getWeather(): WeatherDataResponseDto | undefined {
    return this.weatherDataService.weather();
  }

  hasWeather(): boolean {
    return !!this.weatherDataService.weather();
  }

  getIconUrl(): string | undefined {
    if (!this.hasWeather()) {
      return undefined;
    }
    return `https://openweathermap.org/img/wn/${this.getWeather()?.current.weather[0].icon}@4x.png`
  }

  getCurrentTemperatureDisplay(): string | undefined {
    if (!this.hasWeather()) {
      return undefined;
    }
    const symbol = this.getTemperatureSymbol();
    return `${this.getWeather()?.current.temp} ${symbol}`;
  }

  getDescription(): string | undefined {
    return this.getWeather()?.current.weather[0].description;
  }

  getHumidity(): number | undefined {
    return this.getWeather()?.current.humidity;
  }

  getWindSpeed(): number | undefined {
    return this.getWeather()?.current.wind_speed;
  }

  getFeelsLikeDisplay(): string | undefined {
    if (!this.hasWeather()) {
      return undefined;
    }
    const symbol = this.getTemperatureSymbol();
    return `${this.getWeather()?.current.feels_like} ${symbol}`;
  }

  private getTemperatureSymbol(): string {
    return this.appStateService.isFahrenheitSelected() ? "°F" : "°C";
  }
}
