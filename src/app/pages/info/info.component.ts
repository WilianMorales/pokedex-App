import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  template: `
    <div class="bg-home">
      <app-header></app-header>

      <main class="container">
          <section class="home-div">
              <div class="container">
                  <div class="row animate__animated animate__fadeIn animate__slower" style="margin: 0px auto;">
                      <div class="col-md-6 d-flex flex-wrap mt-3 mb-5">
                          <h1>List of all pokemons!</h1>
                          <p>Select all your favorite pokemon and get their information in a simpler way.</p>
                          <button class="btn btn-info mt-4" [routerLink]="['/pokemon']">Go Pokedex</button>
                      </div>
                      <div class="col-md-6 d-flex flex-wrap">
                          <picture>
                              <img src="assets/images/pokereu.jpg" class="img-fluid mx-auto img-poke" alt="pokereu" width="100%">
                          </picture>
                      </div>
                  </div>
              </div>
          </section>
      </main>
    </div>
  `,
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
