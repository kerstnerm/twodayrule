import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getCollectionDocuments().subscribe(res => {
      console.log(res)
    })
  }
}
