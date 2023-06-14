import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$ = new Subject<boolean>();

  show(): void {
    this.isLoading$.next(true);
  }

  hide(): void {
    setTimeout(() => {
      this.isLoading$.next(false);
    }, 1000)
  }
  
}
