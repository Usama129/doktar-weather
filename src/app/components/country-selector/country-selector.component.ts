import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map, Observable} from 'rxjs';
import countries from "../../../../countries.json";
import {AppStateService} from '../../core/state/app-state.service';

@Component({
  selector: 'app-country-selector',
  imports: [FormsModule, NgbModule],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.scss'
})
export class CountrySelectorComponent {

  @Output() eventClose: EventEmitter<any> = new EventEmitter();
  countryModel: string = "";

  constructor(private appStateService: AppStateService) {}

  searchCountry(text$: Observable<string>) {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 3 ? [] : countries.filter(c => c.name.toLowerCase().includes(term.toLowerCase())).slice(0, 10).map(c => c.name)
      )
    );
  }

  saveCountry(): void {
    const country = countries.find(c => c.name == this.countryModel);
    if (!country) {
      return;
    }
    this.appStateService.setSelectedCountry(country.code);
    this.appStateService.setSelectedLocationName(country.capital)
    this.eventClose.emit();
  }

  closeModal(): void {
    this.eventClose.emit();
  }
}
