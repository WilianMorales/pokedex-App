import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PokeCardComponent } from './components/poke-card/poke-card.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { BaseStatsPipe } from './pipes/base-stats.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    PokeCardComponent,
    SlideToggleComponent,
    BaseStatsPipe
  ],
  exports: [
    HeaderComponent,
    PokeCardComponent,
    SlideToggleComponent,
    BaseStatsPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
