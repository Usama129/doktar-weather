import {Component} from '@angular/core';
import {WeatherDataService} from '../../services/weather-data/weather-data.service';
import {WeatherDataResponseDto} from '../../services/weather-data/weather-data.dto';

@Component({
  selector: 'current-weather',
  imports: [],
  providers: [WeatherDataService],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent {

  constructor(private weatherDataService: WeatherDataService) { }

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

  getCurrentTemperature(): number | undefined {
    return this.getWeather()?.current.temp;
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

  getFeelsLike(): number | undefined {
    return this.getWeather()?.current.feels_like;
  }
}
