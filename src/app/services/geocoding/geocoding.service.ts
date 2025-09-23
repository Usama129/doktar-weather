import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OWM_BASE_URL } from '../../app.config';
import {City, OwmLocation} from '../../models/location';

@Injectable()
export class GeocodingService {

  private readonly directEndpoint = "geo/1.0/direct";
  private readonly zipEndpoint = "geo/1.0/zip";

  constructor(private http: HttpClient, @Inject(OWM_BASE_URL) private baseUrl: string) { }

  searchCityName(query: string, limit: number = 5): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/${this.directEndpoint}`, {
      params: {
        q: query,
        limit: limit
      }
    });
  }

  searchZip(zip: string, countryCode: string): Observable<OwmLocation> {
    return this.http.get<OwmLocation>(`${this.baseUrl}/${this.zipEndpoint}`, {
      params: {
        zip: `${zip},${countryCode}`
      }
    });
  }
}
