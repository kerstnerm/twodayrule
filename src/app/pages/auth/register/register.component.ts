import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {SignUpModel} from "../../../models/sign-up-model";

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

  constructor(public authService: AuthService) {

  }
}
