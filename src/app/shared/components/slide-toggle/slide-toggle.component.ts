import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  template: `
    <div class="slide-toggle mt-1 custom-control custom-switch">
        <input type="checkbox"
        class="custom-control-input"
        id="customSwitches"
        [checked]="classicMode"
        (change)="classicMode = !classicMode">
      <label class="custom-control-label"
        style="cursor: pointer;"
        for="customSwitches">
        {{classicMode ? 'Gif' : 'Classic'}}
      </label>
    </div>
  `,
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent implements OnInit {

  classicMode: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
