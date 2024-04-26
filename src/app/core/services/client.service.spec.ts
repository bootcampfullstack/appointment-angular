import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Page } from '../models/page';
import { Client } from '../models/client';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
       HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should fetch clients page', () => {
    const clientNameFilter = 'test';
    const page = 1;
    const mockPage: Page<Client> = {
      content: [],
      numberOfElements: 0
    };
    
    service.getClientsPage(clientNameFilter, page).subscribe(response => {
      expect(response).toEqual(mockPage);
    });

    const req = httpMock.expectOne(`${service.baseUrl}?name_like=${clientNameFilter}&_page=${page}&_limit=10&_sort=name`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPage);
  });
  

  it('should get client by ID', () => {
    const clientId = 1;
    const mockClient: Client = { id: clientId, name: 'Test Client', phone: '123456789',  dateOfBirth: '2020-10-10' };

    service.getClientById(clientId).subscribe(response => {
      expect(response).toEqual(mockClient);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${clientId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClient);
  });
});
