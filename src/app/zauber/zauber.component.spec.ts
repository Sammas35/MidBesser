import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZauberComponent } from './zauber.component';
import {TEST_CONFIG} from "../testconfig/testconfig";

describe('ZauberComponent', () => {
  let component: ZauberComponent;
  let fixture: ComponentFixture<ZauberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TEST_CONFIG)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZauberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
