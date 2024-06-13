import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { Title } from '@angular/platform-browser';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let mockTitle: jasmine.SpyObj<Title>;

  beforeEach(() =>
    {

      mockTitle = jasmine.createSpyObj<Title>('Title',['setTitle']);

      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent, ToastComponent, HeaderComponent],
        providers: [
          { provide: Title, useValue: mockTitle}
        ]
      });

      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
    }
  );

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Agendamento'`, () => {
    expect(app.title).toEqual('Agendamento');
  });

  it(`should call 'Title.setTitle' with 'app.title'`, () => {
    expect(mockTitle.setTitle).toHaveBeenCalledWith(app.title);
  });

});
