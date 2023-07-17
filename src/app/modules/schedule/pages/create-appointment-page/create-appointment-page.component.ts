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

@Component({
  selector: 'app-create-appointment-page',
  templateUrl: './create-appointment-page.component.html',
  styleUrls: ['./create-appointment-page.component.css']
})
export class CreateAppointmentPageComponent implements OnInit {

  areas: Area[] = [];
  appointmentTypes: AppointmentType[] = [];
  professionalsByArea: Professional[] = [];

  @ViewChild(FormCreateAppointmentComponent)
  private formCreateAppointmentComponent !: FormCreateAppointmentComponent;

  constructor( private areaService: AreaService,
               private appointmentTypeService: AppointmentTypeService,
               private clientService: ClientService,
               private jsonPipe: JsonPipe
               ) { }


  ngOnInit(): void {
    this.loadAreas();
    this.loadAppointmentTypes();
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
    })
  }

  onSelectedArea(area: Area) {
    this.areaService.getActiveProfessionalsFromArea(area).subscribe({
      next: professionals => {
        this.professionalsByArea = professionals;
      }
    })
  }

  createAppointment(){
    this.formCreateAppointmentComponent.submitted = true;
    alert(this.jsonPipe.transform(this.formCreateAppointmentComponent.appointmentForm.value));
  }



}
