import {effect, Inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY, finalize, Observable, of, tap} from 'rxjs';
import {WeatherDataRequestDto, WeatherDataResponseDto} from './weather-data.dto';
import {OWM_BASE_URL} from '../../app.config';
import {AppStateService} from '../../core/state/app-state.service';
import {Unit} from '../../models/weather';
import {ToastService} from '../toast.service';

@Injectable({providedIn: 'root'})
export class WeatherDataService {

  private readonly endpoint = "data/3.0/onecall";
  readonly weather = signal<WeatherDataResponseDto | undefined>(undefined);
  readonly loadingWeatherData = signal<boolean>(false);
  readonly errorFetchingWeather = signal<boolean>(false);

  constructor(private http: HttpClient,
              @Inject(OWM_BASE_URL) private baseUrl: string,
              private appState: AppStateService,
              private toastService: ToastService) {
    effect(() => {
      const latLong = this.appState.selectedLatLong();
      const units = this.appState.isFahrenheitSelected() ? Unit.Imperial : Unit.Metric;
      if (latLong && latLong.lat && latLong.lon) {
        this.fetchWeatherData({...latLong, units}).subscribe();
      }
    });
  }

  fetchWeatherData(params: WeatherDataRequestDto): Observable<WeatherDataResponseDto> {
    this.loadingWeatherData.set(true);
    return this.http.get<WeatherDataResponseDto>(`${this.baseUrl}/${this.endpoint}`, {params}).pipe(
      tap((response) => {
        this.weather.set(response);
        this.errorFetchingWeather.set(false);
      }),
      catchError(() => {
        this.errorFetchingWeather.set(true);
        this.toastService.show('Failed to fetch weather data', 'danger');
        return EMPTY;
      }),
      finalize(() => this.loadingWeatherData.set(false))
    );
  }
}
