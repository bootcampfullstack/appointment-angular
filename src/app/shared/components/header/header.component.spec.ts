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


  it(`should have as title 'Agenda'`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    //Busca o elemento pela classe de css
    const element = fixture.debugElement.query(By.css('.navbar-brand')).nativeElement;
    expect((element).textContent).toEqual('Agenda');
  });

  it(`should have nav-item dropdown  'Cadastros'`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    //Busca o elemento pelo id 
    const element = fixture.debugElement.nativeElement.querySelector('#navbarDropdownCadastro');
    expect((element).textContent).toEqual('Cadastros');
  });

  it(`should have nav-item dropdown  'Agendamentos'`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    //Busca o elemento pelo id 
    const element = fixture.debugElement.nativeElement.querySelector('#navbarDropdownAgendamento');
    expect((element).textContent.trim()).toEqual('Agendamentos');
  });


  it(`should have button 'Sair'`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    //Busca por todos os botões
    const buttonElements = fixture.debugElement.queryAll(By.css('.btn'));
    const buttonWithSairText = buttonElements.find(element => element.nativeElement.textContent.trim() === 'Sair');
    expect(buttonWithSairText).toBeTruthy();
  });

  it(`should contain dropdown items with correct router links in 'Cadastros' (in order)`, () => {
    const dropdownMenu = fixture.debugElement.query(By.css('[aria-labelledby="navbarDropdownCadastro"]'));
    const dropdownItems = dropdownMenu.queryAll(By.css('a[ngbDropdownItem]'));
    const expectedRouterLinks = ['area', 'professional', 'appointment-type', 'clients-table', 'user'];
    dropdownItems.forEach((item, index) => {
      expect(item.attributes['routerLink']).toBe(expectedRouterLinks[index]);
    });
  });

  it(`should contain dropdown items with correct router links in 'Cadastros' (any order)`, () => {
    const dropdownMenu = fixture.debugElement.query(By.css('[aria-labelledby="navbarDropdownCadastro"]'));
    const dropdownItems = dropdownMenu.queryAll(By.css('a[ngbDropdownItem]'));
    const expectedRouterLinks = new Set(['professional', 'appointment-type', 'clients-table', 'user', 'area']);
    const routerLinks = new Set(dropdownItems.map(item => item.attributes['routerLink']));
    expect(routerLinks).toEqual(expectedRouterLinks);
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
