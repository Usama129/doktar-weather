import {Component} from '@angular/core';
import {WeatherDataService} from '../../services/weather-data/weather-data.service';
import {WeatherDataResponseDto} from '../../services/weather-data/weather-data.dto';
import {DayWeatherDataPoint} from '../../models/weather-data-point';

@Component({
  selector: 'five-day-forecast',
  imports: [],
  providers: [WeatherDataService],
  templateUrl: './five-day-forecast.component.html',
  styleUrl: './five-day-forecast.component.scss'
})
export class FiveDayForecastComponent {

  constructor(private weatherDataService: WeatherDataService) { }

  getWeather(): WeatherDataResponseDto | undefined {
    return this.weatherDataService.weather();
  }

  hasWeather(): boolean {
    return !!this.weatherDataService.weather();
  }

  getDailyData(): DayWeatherDataPoint[] | undefined {
    return this.getWeather()?.daily.slice(1, 6);
  }

  getIconUrl(dayWeatherData: DayWeatherDataPoint): string {
    return `https://openweathermap.org/img/wn/${dayWeatherData.weather[0]?.icon}@2x.png`
  }

  getDateMonth(dayWeatherData: DayWeatherDataPoint): string {
    const dt = dayWeatherData.dt;
    const date = new Date(dt * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    return `${weekday} ${day}/${month}`;
  }

  getMinMaxTemp(dayWeatherData: DayWeatherDataPoint): string {
    return `${dayWeatherData.temp.min.toFixed(0)} F / ${dayWeatherData.temp.max.toFixed(0)} F`;
  }
}
