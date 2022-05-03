import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTriageComponent } from './edit-triage.component';

describe('EditTriageComponent', () => {
  let component: EditTriageComponent;
  let fixture: ComponentFixture<EditTriageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTriageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
