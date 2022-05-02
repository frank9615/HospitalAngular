import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriageRegistrationComponent } from './triage-registration.component';

describe('TriageRegistrationComponent', () => {
  let component: TriageRegistrationComponent;
  let fixture: ComponentFixture<TriageRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriageRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TriageRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
