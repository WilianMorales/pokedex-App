import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PokeCardComponent } from './components/poke-card/poke-card.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PokeCardComponent,
    SlideToggleComponent
  ],
  exports: [
    HeaderComponent,
    PokeCardComponent,
    SlideToggleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
