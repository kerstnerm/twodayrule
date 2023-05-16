import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {SignUpModel} from "../../../models/sign-up-model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signUpData: SignUpModel = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: ''
  };

  @ViewChild('registerForm', {static: true}) registerForm: NgForm | undefined;

  constructor(public authService: AuthService) {

  }
}
