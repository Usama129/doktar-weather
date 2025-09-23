import { Component } from '@angular/core';
import {WeatherDataService} from '../../services/weather-data/weather-data.service';
import {WeatherDataResponseDto} from '../../services/weather-data/weather-data.dto';
import {DayWeatherDataPoint, HourWeatherDataPoint} from '../../models/weather-data-point';

@Component({
  selector: 'twentyfour-hour-forecast',
  imports: [],
  providers: [WeatherDataService],
  templateUrl: './twentyfour-hour-forecast.component.html',
  styleUrl: './twentyfour-hour-forecast.component.scss'
})
export class TwentyfourHourForecastComponent {

  constructor(private weatherDataService: WeatherDataService) { }

  getWeather(): WeatherDataResponseDto | undefined {
    return this.weatherDataService.weather();
  }

  hasWeather(): boolean {
    return !!this.weatherDataService.weather();
  }

  getHourlyData(): HourWeatherDataPoint[] | undefined {
    return this.getWeather()?.hourly.slice(0, 24);
  }

  getIconUrl(hourWeatherData: HourWeatherDataPoint): string {
    return `https://openweathermap.org/img/wn/${hourWeatherData.weather[0]?.icon}@2x.png`
  }

  getHourDisplay(hourWeatherData: HourWeatherDataPoint): string {
    const dt = hourWeatherData.dt;
    const date = new Date(dt * 1000);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  getTemperature(hourWeatherData: HourWeatherDataPoint): string {
    return hourWeatherData.temp.toFixed(0);
  }
}
