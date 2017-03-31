import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharakterDetailComponent } from './charakter-detail.component';
import {FormsModule} from "@angular/forms";
import {TEST_CONFIG} from "../testconfig/testconfig";

describe('CharakterDetailComponent', () => {
  let component: CharakterDetailComponent;
  let fixture: ComponentFixture<CharakterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TEST_CONFIG)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharakterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
