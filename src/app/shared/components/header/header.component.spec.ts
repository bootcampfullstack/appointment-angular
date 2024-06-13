import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Agenda' - Angular`, () => {
    const element = fixture.debugElement.query(By.css('.navbar-brand')).nativeElement;
    expect((element).textContent).toEqual('Agenda');
  });

  it(`should have as title 'Agenda' - DOM`, () => {
    const element = fixture.debugElement.nativeElement.querySelector('.navbar-brand');
    expect((element).textContent).toEqual('Agenda');
  });

  it(`should have nav-item dropdown 'Cadastros'`, () => {
    const element = fixture.debugElement.nativeElement.querySelector('#navbarDropdownCadastro');
    expect((element).textContent).toEqual('Cadastros');
  });

  it(`should have nav-item 'Home'`, () => {
    const element = fixture.debugElement.nativeElement.querySelector('#navbarItemHome');
    expect((element).textContent).toEqual('Home');
  });

  it(`should have nav-item dropdown 'Agendamentos'`, () => {
    const element = fixture.debugElement.nativeElement.querySelector('#navbarDropdownAgendamento');
    expect((element).textContent).toEqual('Agendamentos');
  });

  it(`should have button 'Sair'`, () => {
    const buttonElements = fixture.debugElement.queryAll(By.css('.btn'));
    const buttonWithSairText = buttonElements.find(element => element.nativeElement.textContent.trim() === 'Sair');
    expect(buttonWithSairText).toBeTruthy();
  });


  it(`should contain dropdown itens with routers links in 'Cadastros'`, () => {
    const dropDownMenu = fixture.debugElement.query(By.css('[aria-labelledby="navbarDropdownCadastro"]'));
    const dropDownItems = dropDownMenu.queryAll(By.css('a[ngbDropdownItem]'));
    const expectedRouterLinks = ['area','professional','appointment-type','clients-table','user'];
    dropDownItems.forEach((item, index) => {
        expect(item.attributes['routerLink']).toBe(expectedRouterLinks[index]);
    });
  });

  it(`should contain dropdown items with correct router links in 'Agendamentos'`, () => {
    const dropdownMenu = fixture.debugElement.query(By.css('[aria-labelledby="navbarDropdownAgendamento"]'));
    const dropdownItems = dropdownMenu.queryAll(By.css('a[ngbDropdownItem]'));
    const expectedRouterLinks = ['today-appointments', 'create-appointment', 'cancel-appointment', 'client-history', 'professional-workdays'];
    dropdownItems.forEach((item, index) => {
      expect(item.attributes['routerLink']).toBe(expectedRouterLinks[index]);
    });
  });

});
