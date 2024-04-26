import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick, flush } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { routes } from "./maintenance-routing.module";
import { Component } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { By } from "@angular/platform-browser";
import { AreaPageComponent } from "./pages/area-page/area-page.component";
import { MaintenanceModule } from "./maintenance.module";
import { AppModule } from "src/app/app.module";
import { SharedModule } from "src/app/shared/shared.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("Maintenance Routes and Load Components", () => {
  let location: Location;
  let router: Router;
  let fixture: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        MaintenanceModule,
        SharedModule,
        AppModule
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('navigate to "area" redirects you to /area', fakeAsync(() => {
    router.navigate(["/area"]).then(() => {
      expect(location.path()).toBe("/area");
    });
    flush();
  }));

  it('navigate to "professional" redirects you to /professional', fakeAsync(() => {
    router.navigate(["/professional"]).then(() => {
      expect(location.path()).toBe("/professional");
    });
    flush();
  }));

  it('navigate to "appointment-type" redirects you to /appointment-type', fakeAsync(() => {
    router.navigate(["/appointment-type"]).then(() => {
      expect(location.path()).toBe("/appointment-type");
    });
    flush();
  }));

  it('navigate to "clients-table" redirects you to /clients-table', fakeAsync(() => {
    router.navigate(["/clients-table"]).then(() => {
      expect(location.path()).toBe("/clients-table");
    });
    flush();
  }));

  it('navigate to "client-form" redirects you to /client-form', fakeAsync(() => {
    router.navigate(["/client-form"]).then(() => {
      expect(location.path()).toBe("/client-form");
    });
    flush();
  }));


  it('navigate to "client-form" redirects you to /client-form', fakeAsync(() => {
    router.navigate(["/client-form/1"]).then(() => {
      expect(location.path()).toBe("/client-form/1");
    });
    flush();
  }));

  it('navigate to "user" redirects you to /user', fakeAsync(() => {
    router.navigate(["/user"]).then(() => {
      expect(location.path()).toBe("/user");
    });
    flush();
  }));


  it('navigate to "area" loads AreaPageComponent', fakeAsync(() => {
    router.navigate(["/area"]).then(() => {
      tick();
      fixture.detectChanges();
      const areaPageComponent = fixture.debugElement.nativeElement.querySelector('app-area-page');
      expect(areaPageComponent).toBeTruthy();
    });
    flush();
  }));

  it('navigate to "professional" loads ProfessionalPageComponent', fakeAsync(() => {
    router.navigate(["/professional"]).then(() => {
      tick();
      fixture.detectChanges();
      const professionalPageComponent = fixture.debugElement.nativeElement.querySelector('app-professional-page');
      expect(professionalPageComponent).toBeTruthy();
    });
    flush();
  }));

  it('navigate to "clients-table" loads ClientsTablePageComponent', fakeAsync(() => {
    router.navigate(["/clients-table"]).then(() => {
      tick();
      fixture.detectChanges();
      const clientsTablePageComponent = fixture.debugElement.nativeElement.querySelector('app-clients-table-page');
      expect(clientsTablePageComponent).toBeTruthy();
    });
    flush();
  }));


  it('navigate to "clients-table" loads ClientsTablePageComponent', fakeAsync(() => {
    router.navigate(["/clients-table"]).then(() => {
      tick();
      fixture.detectChanges();
      const clientsTablePageComponent = fixture.debugElement.nativeElement.querySelector('app-clients-table-page');
      expect(clientsTablePageComponent).toBeTruthy();
    });
    flush();
  }));

  it('navigate to "appointment-type" loads AppointmentTypePageComponent', fakeAsync(() => {
    router.navigate(["/appointment-type"]).then(() => {
      tick();
      fixture.detectChanges();
      const appointmentTypePageComponent = fixture.debugElement.nativeElement.querySelector('app-appointment-type-page');
      expect(appointmentTypePageComponent).toBeTruthy();
    });
    flush();
  }));
 
  it('navigate to "client-form" loads ClientFormPageComponent', fakeAsync(() => {
    router.navigate(["/client-form"]).then(() => {
      tick();
      fixture.detectChanges();
      const appointmentTypePageComponent = fixture.debugElement.nativeElement.querySelector('app-client-form-page');
      expect(appointmentTypePageComponent).toBeTruthy();
    });
    flush();
  }));

  it('navigate to "client-form/{id}" loads ClientFormPageComponent', fakeAsync(() => {
    router.navigate(["/client-form/1"]).then(() => {
      tick();
      fixture.detectChanges();
      const appointmentTypePageComponent = fixture.debugElement.nativeElement.querySelector('app-client-form-page');
      expect(appointmentTypePageComponent).toBeTruthy();
    });
    flush();
  }));

});