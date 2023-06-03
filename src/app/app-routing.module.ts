import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from '@pages/pokemon/pokemon.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from '@pages/info/info.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: InfoComponent
  },
  {
    path: 'pokemon', component: HomeComponent
  },
  {
    path: 'pokemon/:name', component: PokemonComponent
  },
  {
    path: '**', redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
