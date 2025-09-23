import {Injectable, signal} from "@angular/core";

@Injectable({providedIn: "root"})
export class AppStateService {

  readonly selectedCountryCode = signal<string>("TR");
  readonly selectedLocationName = signal<string>("Ankara");
  readonly selectedLatLong = signal({lat: 0, lon: 0});

  setSelectedCountry(countryCode: string): void {
    this.selectedCountryCode.set(countryCode);
  }

  setSelectedLocationName(city: string): void {
    this.selectedLocationName.set(city);
  }

  setSelectedLatLong(latLong: { lat: number, lon: number }) {
    this.selectedLatLong.set(latLong);
  }
}
