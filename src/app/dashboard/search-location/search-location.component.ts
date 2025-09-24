import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {finalize} from 'rxjs';
import {OwmLocation} from '../../models/location';
import {SearchBy, SearchLocationService} from './search-location.service';
import {GeocodingService} from '../../services/geocoding/geocoding.service';

@Component({
  selector: 'search-location',
  imports: [
    NgbDropdown,
    NgbDropdownMenu,
    ReactiveFormsModule,
    NgbDropdownModule,
    FormsModule,
  ],
  providers: [SearchLocationService, GeocodingService],
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.scss'
})
export class SearchLocationComponent implements OnInit {

  @ViewChild('resultsDropdown') resultsDropdown?: NgbDropdown;

  queryModel: string = "";

  constructor(private searchLocationService: SearchLocationService) {}

  ngOnInit() {
    this.searchLocationService.getQueryExec$().subscribe((exec) => {
      if (exec) {
        setTimeout(() => this.resultsDropdown?.open(), 0);
      }
    });
  }

  onLocationSelected(loc: OwmLocation): void {
    this.searchLocationService.setLocation(loc);
    this.queryModel = "";
    this.searchLocationService.setResults([]);
    this.resultsDropdown?.close();
  }

  setSearchBy(searchBy: SearchBy) {
    this.searchLocationService.setSearchBy(searchBy);
    this.searchLocationService.setResults([]);
    this.queryModel = "";
  }

  isSearchByCity(): boolean {
    return this.searchLocationService.isSearchByCity();
  }

  isLoading(): boolean {
    return this.searchLocationService.isSearchLoading();
  }

  isValidQueryLength(): boolean {
    return this.queryModel.length >= 3;
  }

  onSearch(): void {
    if (!this.isValidQueryLength()) {
      this.resultsDropdown?.close();
      return;
    }
    this.resultsDropdown?.open();

    if (this.isSearchByCity()) {
      this.searchLocationService.queryCity(this.queryModel);
    } else {
      this.searchLocationService.queryZipCode(this.queryModel);
    }
  }

  getResults(): OwmLocation[] {
    return this.searchLocationService.getResults();
  }

  protected readonly SearchBy = SearchBy;
}
