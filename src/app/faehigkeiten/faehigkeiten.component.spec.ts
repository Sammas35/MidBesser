import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaehigkeitenComponent } from './faehigkeiten.component';
import {TEST_CONFIG} from "../testconfig/testconfig";

describe('FaehigkeitenComponent', () => {
  let component: FaehigkeitenComponent;
  let fixture: ComponentFixture<FaehigkeitenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TEST_CONFIG)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaehigkeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
