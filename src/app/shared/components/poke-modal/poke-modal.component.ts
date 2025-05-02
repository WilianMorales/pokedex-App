import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoritePokemon } from '@interfaces/favorite-pokemon.interface';
import { LocalStorageService } from '@services/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-modal',
  templateUrl: './poke-modal.component.html',
  styleUrls: ['./poke-modal.component.scss']
})
export class PokeModalComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modal!: ElementRef;

  favoritePokemons: FavoritePokemon[] = [];
  private subscription!: Subscription;

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.localStorageService.favorites$.subscribe(favorites => {
      this.favoritePokemons = favorites;
    });
  }

  removeFavorite(id: number): void {
    const name = this.favoritePokemons.find(p => p.id === id)?.name;
    if (name) {
      this.localStorageService.toggleFavorite(id, name);
    }
  }

  goToDetail(name: string): void {
    const modalElement = this.modal.nativeElement;
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();

    this.router.navigate(['/pokemon', name]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
