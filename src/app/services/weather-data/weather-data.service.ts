import {effect, Inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {WeatherDataRequestDto, WeatherDataResponseDto} from './weather-data.dto';
import {OWM_BASE_URL} from '../../app.config';
import {AppStateService} from '../../core/state/app-state.service';

@Injectable()
export class WeatherDataService {

  private readonly endpoint = "data/3.0/onecall";
  readonly weather = signal<WeatherDataResponseDto | undefined>(undefined);

  constructor(private http: HttpClient, @Inject(OWM_BASE_URL) private baseUrl: string, private appState: AppStateService) {
    effect(() => {
      const latLong = this.appState.selectedLatLong();
      if (latLong) {
        this.fetchWeatherData(latLong).subscribe();
      }
    });
  }

  fetchWeatherData(params: WeatherDataRequestDto): Observable<WeatherDataResponseDto> {
    return this.http.get<WeatherDataResponseDto>(`${this.baseUrl}/${this.endpoint}`, {params}).pipe(
      tap(response => {
        this.weather.set(response);
      })
    );
  }
}
