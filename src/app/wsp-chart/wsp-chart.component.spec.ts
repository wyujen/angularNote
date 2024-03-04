import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WspChartComponent } from './wsp-chart.component';

describe('WspChartComponent', () => {
  let component: WspChartComponent;
  let fixture: ComponentFixture<WspChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WspChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WspChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
