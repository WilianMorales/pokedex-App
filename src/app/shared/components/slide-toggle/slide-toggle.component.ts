import { Component, OnInit } from '@angular/core';
import { ImageModeService } from '@services/imageMode.service';

@Component({
  selector: 'app-slide-toggle',
  template: `
    <div class="slide-toggle mt-1 custom-control custom-switch">
        <input type="checkbox"
        class="custom-control-input"
        id="customSwitches"
        [checked]="classicMode"
        (change)="onToggle()">
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

  constructor(private imageModeService: ImageModeService) { }

  ngOnInit(): void {
    this.imageModeService.classicMode$.subscribe(mode => {
      this.classicMode = mode;
    });
  }

  onToggle(): void {
    this.imageModeService.toggleMode();
  }

}
