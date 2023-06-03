import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
          <div class="logo animate__animated animate__fadeIn animate__slower" [routerLink]="['/home']">
              <img src="assets/images/logo.svg" width="320" height="120" alt="logo">
          </div>
      </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() { }

}
