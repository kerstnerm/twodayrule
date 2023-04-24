import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
import {UserProfile} from "../../models/user-profile";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit{
  profile$: Observable<UserProfile> | undefined;
  showDropdownUser = false;
  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.profile$ = this.authService.getUserProfile();
  }
}
