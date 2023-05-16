import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'register',
          component: RegisterComponent
        }
      ]), HttpClientTestingModule, FormsModule],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should url register url match', () => {
    /* const expectedUrl = '/auth/register';
    router.navigate([expectedUrl]);
    const currentUrl = router.url.toString();
    console.log(location.pathname);
    expect(currentUrl).toBe(expectedUrl); */
  });

  it('should have a submit button', () => {
    const submitBtn = fixture.debugElement.nativeElement.querySelector('[type=submit]');
    expect(submitBtn).toBeDefined();
  });

  it('should have form fields', () => {
    const emailField = fixture.debugElement.nativeElement.querySelector('#email');
    const passwordField = fixture.debugElement.nativeElement.querySelector('#password');
    const confirmPasswordField = fixture.debugElement.nativeElement.querySelector('#confirmPassword');
    const descriptionField = fixture.debugElement.nativeElement.querySelector('#description');
    expect(emailField.innerHTML).toBeDefined();
    expect(passwordField.innerHTML).toBeDefined();
    expect(confirmPasswordField.innerHTML).toBeDefined();
    expect(descriptionField.innerHTML).toBeDefined();
  });

  it ('should be inactive submit button by default', () => {
    const submitBtn = fixture.debugElement.nativeElement.querySelector('[type=submit]');
    expect(submitBtn.disabled).toBeTruthy();
  })

  it ('should be invalid form by default', () => {
    expect(component.registerForm?.form.valid).toBeFalse();
  })

  it ('should have warning message when input invalid email', () => {
    const wrongEmail = 'abcdelet@'
    const emailControl = component.registerForm?.form.controls['email'];
    emailControl?.setValue(wrongEmail);
    emailControl?.markAsDirty();
    fixture.detectChanges();
    const alert = fixture.debugElement.nativeElement.querySelector('#email-alert');
    expect(alert.innerHTML).toBeDefined();
  })

  it ('should have warning if password and confirm password does not match', () => {
    const pass1 = 'Password_1';
    const pass2 = 'Password_2';
    const passwordControl = component.registerForm?.form.controls['password'];
    const confirmPasswordControl = component.registerForm?.form.controls['confirmPassword'];
    passwordControl?.setValue(pass1);
    passwordControl?.markAsDirty();
    confirmPasswordControl?.setValue(pass2);
    confirmPasswordControl?.markAsDirty();
    fixture.detectChanges();
    const alert = fixture.debugElement.nativeElement.querySelector('#password-alert');
    expect(alert.innerHTML).toBeDefined();
  })
});
