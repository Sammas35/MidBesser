import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LernComponent } from './lern.component';

describe('LernBaseComponent', () => {
  let component: LernComponent;
  let fixture: ComponentFixture<LernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LernComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
