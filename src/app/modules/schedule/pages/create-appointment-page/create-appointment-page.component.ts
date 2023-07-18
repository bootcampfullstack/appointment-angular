import { JsonPipe } from '@angular/common';
import { FormCreateAppointmentComponent } from './../../components/form-create-appointment/form-create-appointment.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { AppointmentType } from 'src/app/core/models/appointment-type';
import { Area } from 'src/app/core/models/area';
import { Client } from 'src/app/core/models/client';
import { Professional } from 'src/app/core/models/professional';
import { AppointmentTypeService } from 'src/app/core/services/appointment-type.service';
import { AreaService } from 'src/app/core/services/area.service';
import { ClientService } from 'src/app/core/services/client.service';
import { ProfessionalService } from 'src/app/core/services/professional.service';
import { Time } from '../../components/time/models/time';
import { Appointment } from 'src/app/core/models/appointment';

@Component({
  selector: 'app-create-appointment-page',
  templateUrl: './create-appointment-page.component.html',
  styleUrls: ['./create-appointment-page.component.css']
})
export class CreateAppointmentPageComponent implements OnInit {

  areas: Area[] = [];
  appointmentTypes: AppointmentType[] = [];
  professionalsByArea: Professional[] = [];
  selectedProfessional: Professional = {} as Professional;

  //Calendar Component
  calendarMonth: Date = new Date();
  availableDays: number[] = [];
  selectedDate !: Date;

  //Time Component
  selectedTime !: Time;
  availableTimes: Time[] = [];

  @ViewChild(FormCreateAppointmentComponent)
  private formCreateAppointmentComponent !: FormCreateAppointmentComponent;

  constructor( private areaService: AreaService,
               private appointmentTypeService: AppointmentTypeService,
               private clientService: ClientService,
               private professionalService: ProfessionalService,
               private jsonPipe: JsonPipe
               ) { }


  ngOnInit(): void {
    this.loadAreas();
    this.loadAppointmentTypes();
  }

  onSelectedTime(time: Time){
    this.selectedTime = time;
  }


  onSelectedProfessional(professional: Professional){
    this.selectedProfessional = professional;
    this.calendarMonth = new Date();
    this.loadAvailableDays();
    this.availableTimes= [];
  }

  onSelectedDate(date: Date){
    this.selectedDate = date;
    this.loadAvailableTimes();
  }

  loadAvailableTimes() {
    this.professionalService.getAvailableTimes(this.selectedProfessional, this.selectedDate).subscribe({
      next: times => this.availableTimes = times
    })
  }

  loadAvailableDays(){
    this.professionalService.getAvailableDays(this.selectedProfessional, this.calendarMonth).subscribe({
      next: days => this.availableDays = days
    })
  }

  onChangedMonth(date: Date){
    this.calendarMonth = date;
    this.availableTimes = [];
    this.loadAvailableDays();
  }

  searchClients = (text: Observable<string>):Observable<Client[]> => {
    return text.pipe(
			debounceTime(200),
			distinctUntilChanged(),
      filter( term => term.length >= 2),
			switchMap(term => this.clientService.getClientsWithNameContaining(term))
		);
  }


  loadAppointmentTypes() {
     this.appointmentTypeService.getAppointmentTypes().subscribe(
      {
        next: types => this.appointmentTypes = types
      }
    )
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: areas => this.areas = areas
    });

  }

  onSelectedArea(area: Area) {
    this.areaService.getActiveProfessionalsFromArea(area).subscribe({
      next: professionals => {
        this.professionalsByArea = professionals;
      }
    });
    this.availableDays = [];
    this.availableTimes= [];
  }

  createAppointment(){
    this.formCreateAppointmentComponent.submitted = true;
    let appointment: Appointment = {} as Appointment;

    appointment = {...this.formCreateAppointmentComponent.appointmentForm.value};
    appointment.startTime = this.selectedTime.startTime;
    appointment.endTime = this.selectedTime.endTime;
    appointment.date = this.selectedDate;


    console.log(this.jsonPipe.transform(appointment));
  }



}
