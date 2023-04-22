import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  profile$: Observable<unknown> | undefined;
  showDropdownUser = false;
  showSidebar = false;
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    // this.profile$ = this.authService.getUserProfile();
    this.authService.getUserProfile().subscribe(res => {
      console.log(res);
    })
  }
}
