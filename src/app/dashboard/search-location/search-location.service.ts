import {effect, Injectable} from '@angular/core';
import {AppStateService} from '../../core/state/app-state.service';
import {OwmLocation} from '../../models/location';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  distinctUntilChanged, filter,
  finalize,
  map,
  of,
  Subject,
  switchMap,
  tap
} from 'rxjs';
import {GeocodingService} from '../../services/geocoding/geocoding.service';
import {ToastService} from '../../services/toast.service';

export enum SearchBy {
  City = 'City',
  Zip = 'Zip Code'
};

@Injectable()
export class SearchLocationService {
  private results: OwmLocation[] = [];
  private searchBy: SearchBy = SearchBy.City;
  private queryExec$ = new BehaviorSubject<undefined | boolean>(undefined); // fires when executing search
  private cityQuery$ = new BehaviorSubject<string>("");
  private zipQuery$ = new BehaviorSubject<string>("");
  private countryCode$ = new BehaviorSubject<string>("");
  private searchLoading : boolean = false;

  constructor(private appStateService: AppStateService,
              private geocodingService: GeocodingService,
              private toastService: ToastService) {
    effect(() => {
      this.countryCode$.next(this.appStateService.selectedCountryCode());
    });
    this.attachCityQueryListener();
    this.attachZipCodeQueryListener();
  }

  setLocation(loc: OwmLocation) {
    this.appStateService.setSelectedLocationName(loc.name);
    this.appStateService.setSelectedLatLong({lat: loc.lat, lon: loc.lon});
  }

  attachZipCodeQueryListener(): void {
    combineLatest([this.zipQuery$, this.countryCode$]).pipe(
      filter(() => !this.isSearchByCity()),
      distinctUntilChanged(([prevZip, prevCountryCode], [zip, countryCode]) => prevZip === zip && prevCountryCode === countryCode),
      switchMap(([zip, countryCode]) => {
        if (zip.length < 3) {
          return of(undefined);
        }
        this.searchLoading = true;
        this.queryExec$.next(true);
        return this.geocodingService.searchZip(zip, countryCode).pipe(
          map(loc => (loc ? [loc] : [])),
          catchError(() => of([])),
          finalize(() => this.searchLoading = false)
        )
      }),
      tap(cities => {
        if (!cities) {
          return;
        }
        this.results = cities;
        if (cities.length == 0) {
          this.showZipCodeError();
        }
      })
    ).subscribe();
  }

  attachCityQueryListener(): void {
    combineLatest([this.cityQuery$, this.countryCode$]).pipe(
      filter(() => this.isSearchByCity()),
      distinctUntilChanged(([prevCity, prevCountryCode], [city, countryCode]) => prevCity === city && prevCountryCode === countryCode),
      switchMap(([city, countryCode]) => {
        if (city.length < 3) {
          return of(undefined);
        }
        this.searchLoading = true;
        this.queryExec$.next(true);
        return this.geocodingService.searchCityName(`${city},${countryCode}`).pipe((finalize(() => this.searchLoading = false)))
      }),
      tap(cities => {
        if (!cities) {
          return;
        }
        this.results = cities;
        if (cities.length == 0) {
          this.showCityError();
        }
      }),
      catchError(() => {
        this.results = [];
        this.showCityError();
        return of([]);
      }),
    ).subscribe();
  }

  setResults(results: OwmLocation[]) {
    this.results = results;
  }

  getResults() {
    return this.results;
  }

  private showZipCodeError(): void {
    this.toastService.show('Could not find your zip code in ' + this.appStateService.selectedCountryCode() +'. Make sure you have selected the correct country', 'danger');
  }

  private showCityError(): void {
    this.toastService.show('Could not find your city in ' + this.appStateService.selectedCountryCode() +'. Make sure you have selected the correct country.', 'danger');
  }

  queryCity(query: string): void {
    this.cityQuery$.next(query);
  }

  queryZipCode(zipCode: string): void {
    this.zipQuery$.next(zipCode);
  }

  isSearchLoading(): boolean {
    return this.searchLoading;
  }

  getQueryExec$(): Subject<undefined | boolean> {
    return this.queryExec$;
  }

  setSearchBy(searchBy: SearchBy): void {
    this.searchBy = searchBy;
  }

  isSearchByCity(): boolean {
    return this.searchBy === SearchBy.City;
  }
}
