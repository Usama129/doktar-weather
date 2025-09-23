import {DayWeatherDataPoint, HourWeatherDataPoint} from '../../models/weather-data-point';

export interface WeatherDataRequestDto {
  [param: string]: string | number | boolean | ReadonlyArray<string|number|boolean>;
  lat: number;
  lon: number;
}

export interface WeatherDataResponseDto {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: HourWeatherDataPoint;
  hourly: HourWeatherDataPoint[];
  daily: DayWeatherDataPoint[];
}

