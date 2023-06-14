import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PokeCardComponent } from './components/poke-card/poke-card.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { BaseStatsPipe } from './pipes/base-stats.pipe';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PokeModalComponent } from './components/poke-modal/poke-modal.component';
import { ImgBrokenDirective } from './directives/img-broken.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    PokeCardComponent,
    SlideToggleComponent,
    BaseStatsPipe,
    SpinnerComponent,
    PokeModalComponent,
    ImgBrokenDirective
  ],
  exports: [
    HeaderComponent,
    PokeCardComponent,
    SlideToggleComponent,
    BaseStatsPipe,
    SpinnerComponent,
    PokeModalComponent,
    ImgBrokenDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
