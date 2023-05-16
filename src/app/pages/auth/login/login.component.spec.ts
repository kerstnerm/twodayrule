import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {By} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBe('Sign in to your account');
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.innerHTML).toBe('Sign in to your account');
  });

  it('should have a submit button', () => {
    const submitBtn = fixture.debugElement.nativeElement.querySelector('[type=submit]');
    expect(submitBtn.innerHTML).toBe('Sign in');
  });

  it('should have email and password fields', () => {
    const emailField = fixture.debugElement.nativeElement.querySelector('#email');
    const passwordField = fixture.debugElement.nativeElement.querySelector('#password');
    expect(emailField.innerHTML).toBeDefined();
    expect(passwordField.innerHTML).toBeDefined();
  });
});
