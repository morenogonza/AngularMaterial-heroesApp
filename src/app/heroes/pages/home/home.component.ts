import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        padding: 10px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  get auth() {
    return this.autService.auth;
  }

  constructor(private router: Router, private autService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.router.navigate(['./auth']);
  }
}
