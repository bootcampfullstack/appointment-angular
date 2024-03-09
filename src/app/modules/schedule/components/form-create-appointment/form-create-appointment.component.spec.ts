import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateAppointmentComponent } from './form-create-appointment.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


describe('FormCreateAppointmentComponent', () => {
  let component: FormCreateAppointmentComponent;
  let fixture: ComponentFixture<FormCreateAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgbTypeahead
       ],
       declarations: [FormCreateAppointmentComponent],
       providers: [
        DatePipe
       ]
    });
    fixture = TestBed.createComponent(FormCreateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


