import { Component,  } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="overlay" *ngIf="isLoading$ | async">
    <div class="loading">
      <img src="assets/images/loading.gif" alt="loading.." width="180px">
      <h2>Loading . . .</h2>
    </div>
  </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  isLoading$ = this.spinnerSvc.isLoading$;

  constructor(private spinnerSvc: SpinnerService) { }

}
