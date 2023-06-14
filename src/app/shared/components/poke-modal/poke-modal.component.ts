import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poke-modal',
  template: `
    <div class="modal fade" id="favoriteModalCenter" tabindex="-1" role="dialog" aria-labelledby="favoriteModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="favoriteModalLongTitle">Your Favorites</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>

              <div class="modal-body">
                <div class="container">
                  <div class="favorite-pokemon">
                      <img class="pokemon-img-fav" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png">
                      <div class="favorite-pokemon__name">Charizard</div>
                      <div class="remove-favorite">
                          <img class="remove-icon" src="assets/icon/remove.svg">
                      </div>
                  </div>

                  <div class="favorite-pokemon">
                      <img class="pokemon-img-fav" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png">
                      <div class="favorite-pokemon__name">Wigglytuff</div>
                      <div class="remove-favorite">
                          <img class="remove-icon" src="assets/icon/remove.svg">
                      </div>
                  </div>

                  <div class="favorite-pokemon">
                      <img class="pokemon-img-fav" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png">
                      <div class="favorite-pokemon__name">Mew</div>
                      <div class="remove-favorite">
                          <img class="remove-icon" src="assets/icon/remove.svg">
                      </div>
                  </div>

                  <div class="favorite-pokemon">
                      <img class="pokemon-img-fav" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png">
                      <div class="favorite-pokemon__name">Mewtwo</div>
                      <div class="remove-favorite">
                          <img class="remove-icon" src="assets/icon/remove.svg">
                      </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  `,
  styleUrls: ['./poke-modal.component.scss']
})
export class PokeModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
