import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { Title } from '@angular/platform-browser';

describe('AppComponent', () => {
  let mockTitleService: jasmine.SpyObj<Title>;

  beforeEach(() => {
    mockTitleService = jasmine.createSpyObj<Title>('Title', ['setTitle']);
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent, ToastComponent, HeaderComponent],
    providers: [
      { provide: Title, useValue: mockTitleService }
    ]
     })
    }
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Agendamento'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Agendamento');
  });

  it('should call titleService.setTitle with app.title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(app.title);
  });

});
