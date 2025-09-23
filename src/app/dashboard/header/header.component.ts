import {Component} from '@angular/core';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CountrySelectorComponent} from '../country-selector/country-selector.component';
import {AppStateService} from '../../core/state/app-state.service';
import {FormsModule} from '@angular/forms';
import {SettingsComponent} from '../settings/settings.component';


@Component({
  selector: 'app-header',
  imports: [FormsModule, NgbModule],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private ngbModal: NgbModal,
    private appStateService: AppStateService,
  ) { }

  launchCountrySelector(): void {
    const modalRef = this.ngbModal.open(CountrySelectorComponent);
    modalRef.componentInstance.eventClose.subscribe(() => modalRef.close());
  }

  launchSettings(): void {
    const modalRef = this.ngbModal.open(SettingsComponent);
    modalRef.componentInstance.eventClose.subscribe(() => modalRef.close());
  }

  getSelectedCountryCode(): string {
    return this.appStateService.selectedCountryCode();
  }

  getSelectedLocationName(): string {
    return this.appStateService.selectedLocationName();
  }
}
