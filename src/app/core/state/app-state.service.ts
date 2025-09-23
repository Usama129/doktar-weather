import {Injectable, signal} from "@angular/core";

@Injectable({providedIn: "root"})
export class AppStateService {

  readonly selectedCountryCode = signal<string>("TR");
  readonly selectedLocationName = signal<string>("Ankara");
  readonly selectedLatLong = signal({lat: 0, lon: 0});
  readonly isFahrenheitSelected = signal<boolean>(false);

  setSelectedCountry(countryCode: string): void {
    this.selectedCountryCode.set(countryCode);
  }

  setSelectedLocationName(city: string): void {
    this.selectedLocationName.set(city);
  }

  setSelectedLatLong(latLong: { lat: number, lon: number }) {
    this.selectedLatLong.set(latLong);
  }

  setFahrenheitSelected(selectFahrenheit: boolean): void {
    this.isFahrenheitSelected.set(selectFahrenheit);
  }
}
