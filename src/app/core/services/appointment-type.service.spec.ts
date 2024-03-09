import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppointmentTypeService } from './appointment-type.service';

describe('AppointmentTypeService', () => {
  let service: AppointmentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
       HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AppointmentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
