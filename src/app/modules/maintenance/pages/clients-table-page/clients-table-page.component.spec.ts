import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ClientsTablePageComponent } from './clients-table-page.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ClientService } from 'src/app/core/services/client.service';
import { of } from 'rxjs';
import { formatDate } from '@angular/common';
import { MockComponent } from 'ng-mocks';


const clients = {
  "content": [
    { "id": 3, "name": "Ana Maria", "phone": "15 992231122", "dateOfBirth": "2000-08-02", "comments": "Parcelar em até 4x" },
    { "id": 4, "name": "Pedro Silva", "phone": "15 923233212", "dateOfBirth": "1998-01-22", "comments": "Indicação" },
    { "id": 5, "name": "Marco Nunes", "phone": "11 902324322", "dateOfBirth": "1998-01-22", "comments": "" }
  ],
  "numberOfElements": 3
};


describe('ClientsTablePageComponent', () => {
  let component: ClientsTablePageComponent;
  let fixture: ComponentFixture<ClientsTablePageComponent>;
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbPagination
      ],
      declarations: [
        ClientsTablePageComponent,
        ModalComponent
      ]

    });
    fixture = TestBed.createComponent(ClientsTablePageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ClientService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients from service on init component', () => {
    spyOn(service, 'getClientsPage').and.returnValue(of(clients));
    component.ngOnInit();
    expect(service.getClientsPage).toHaveBeenCalled();
    expect(component.clientPage).toEqual(clients);
  });


  it(`should have 3 clients in table`, fakeAsync(() => {
    spyOn(service, 'getClientsPage').and.returnValue(of(clients));
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(3);
  }));

  
  it(`should have clients data in table`, fakeAsync(() => {
    spyOn(service, 'getClientsPage').and.returnValue(of(clients));
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
   
    // Verify the data in each row
    tableRows.forEach((row: HTMLElement, index: number) => {
      const rowData = clients.content[index]; // Get the corresponding client data
      const columns = row.querySelectorAll('td');

      expect(columns[0].textContent).toContain(rowData.name); // Check client name
      expect(columns[1].textContent).toContain(rowData.phone); // Check client phone

      // Format the dateOfBirth to match the expected format (dd/MM/yyyy)
      const formattedDateOfBirth = formatDate(rowData.dateOfBirth, 'dd/MM/yyyy', 'pt-BR');
      expect(columns[2].textContent).toContain(formattedDateOfBirth);
    });
  }));

});


