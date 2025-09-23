import {DayWeatherDataPoint, HourWeatherDataPoint, Unit} from '../../models/weather';

export interface WeatherDataRequestDto {
  [param: string]: string | number | boolean | ReadonlyArray<string|number|boolean>;
  lat: number;
  lon: number;
  units: Unit
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

