import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayForecastComponent } from './five-day-forecast.component';

describe('FiveDayForecastComponent', () => {
  let component: FiveDayForecastComponent;
  let fixture: ComponentFixture<FiveDayForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiveDayForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
