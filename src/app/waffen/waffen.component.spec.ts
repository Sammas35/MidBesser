import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaffenComponent } from './waffen.component';
import {TEST_CONFIG} from "../testconfig/testconfig";

describe('WaffenComponent', () => {
  let component: WaffenComponent;
  let fixture: ComponentFixture<WaffenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TEST_CONFIG)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaffenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
