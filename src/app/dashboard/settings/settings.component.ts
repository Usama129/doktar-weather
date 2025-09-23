import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppStateService} from '../../core/state/app-state.service';

@Component({
  selector: 'app-settings',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  @Output() eventClose: EventEmitter<any> = new EventEmitter();

  constructor(private appStateService: AppStateService) {}

  closeModal(): void {
    this.eventClose.emit();
  }

  toggleTemperatureUnit(event: any): void {
    const useFahrenheit: boolean = event.target.checked;
    this.appStateService.setFahrenheitSelected(useFahrenheit);
  }

  isUnitFahrenheitSelected(): boolean {
    return this.appStateService.isFahrenheitSelected();
  }
}
