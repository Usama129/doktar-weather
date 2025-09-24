import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {catchError, distinctUntilChanged, finalize, mergeMap, of, Subject, tap} from 'rxjs';
import {AppStateService} from '../../core/state/app-state.service';
import {City, OwmLocation} from '../../models/location';
import {GeocodingService} from '../../services/geocoding/geocoding.service';
import {ToastService} from '../../services/toast.service';

enum SearchBy {
  City = 'City',
  Zip = 'Zip Code'
};

@Component({
  selector: 'search-location',
  imports: [
    NgbDropdown,
    NgbDropdownMenu,
    ReactiveFormsModule,
    NgbDropdownModule,
    FormsModule,
  ],
  providers: [GeocodingService],
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.scss'
})
export class SearchLocationComponent implements OnInit {

  @ViewChild('resultsDropdown') resultsDropdown?: NgbDropdown;

  searchBy: SearchBy = SearchBy.City;
  private cityNameQuery$ = new Subject<string>();
  queryModel: string = "";
  results: OwmLocation[] = [];

  private loading: boolean = false;

  constructor(private appStateService: AppStateService,
              private geocodingService: GeocodingService,
              private toastService: ToastService) {}

  ngOnInit() {
    this.cityNameQuery$.pipe(
      distinctUntilChanged(),
      tap(() => this.loading = true),
      mergeMap(term => {
        if (term.length < 3) {
          this.loading = false;
          return of([]);
        }
        return this.geocodingService.searchCityName(`${term},${this.getSelectedCountryCode()}`).pipe(
          catchError(() => {
            return of([]);
          }),
          finalize(() => this.loading = false),
        );
      }),
    ).subscribe((results: City[]) => {
      this.results = results;
      if (results.length == 0) {
        this.showCityError();
      }
    });
  }

  getSelectedCountryCode(): string {
    return this.appStateService.selectedCountryCode();
  }

  onLocationSelected(loc: OwmLocation): void {
    this.appStateService.setSelectedLocationName(loc.name);
    this.appStateService.setSelectedLatLong({lat: loc.lat, lon: loc.lon});
    this.queryModel = "";
    this.results = [];
    this.resultsDropdown?.close();
  }

  setSearchBy(searchBy: SearchBy) {
    this.searchBy = searchBy;
    this.results = [];
    this.queryModel = "";
  }

  isSearchByCity(): boolean {
    return this.searchBy === SearchBy.City;
  }

  isSearchByZipCode(): boolean {
    return this.searchBy === SearchBy.Zip;
  }

  isLoading(): boolean {
    return this.loading;
  }

  private searchCity(): void {
    if (!this.isValidQueryLength()) {
      this.resultsDropdown?.close();
      return;
    }
    this.resultsDropdown?.open();
    this.cityNameQuery$.next(this.queryModel);
  }

  private searchZipCode(): void {
    this.loading = true;
    this.resultsDropdown?.open();
    this.geocodingService.searchZip(this.queryModel, this.getSelectedCountryCode()).pipe(
      tap(location => {
        if (location.lat) {
          this.results = [location];
        }
      }),
      catchError(() => {
        this.results = [];
        this.showZipCodeError();
        return of(undefined);
      }),
      finalize(() => {
        this.loading = false;
      }),
    ).subscribe()
  }

  isValidQueryLength(): boolean {
    return this.queryModel.length >= 3;
  }

  onSearch(): void {
    if (this.isSearchByCity()) {
      this.searchCity();
    } else if (this.isSearchByZipCode()) {
      this.searchZipCode()
    }
  }

  private showZipCodeError(): void {
    this.toastService.show('Could not find your zip code in ' + this.getSelectedCountryCode() +'. Make sure you have selected the correct country', 'danger');
  }

  private showCityError(): void {
    this.toastService.show('Could not find your city in ' + this.getSelectedCountryCode() +'. Make sure you have selected the correct country.', 'danger');
  }

  protected readonly SearchBy = SearchBy;
}
