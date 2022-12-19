import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
          <div class="logo">
              <img src="assets/images/logo.png" width="320" height="120" alt="logo">
          </div>
      </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() { }

}
