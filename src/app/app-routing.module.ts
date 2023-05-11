import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from '@pages/pokemon/pokemon.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/pokemon', pathMatch: 'full'
  },
  {
    path: 'pokemon', component: HomeComponent
  },
  {
    path: 'pokemon/:name', component: PokemonComponent
  },
  {
    path: '**', redirectTo: '/pokemon', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
