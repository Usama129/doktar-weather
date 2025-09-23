import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyfourHourForecastComponent } from './twentyfour-hour-forecast.component';

describe('TwentyfourHourForecastComponent', () => {
  let component: TwentyfourHourForecastComponent;
  let fixture: ComponentFixture<TwentyfourHourForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwentyfourHourForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwentyfourHourForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
