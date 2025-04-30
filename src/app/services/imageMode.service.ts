import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageModeService {
  private readonly STORAGE_KEY = 'classicMode';
  private modeSubject: BehaviorSubject<boolean>;

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const initialValue = saved !== null ? JSON.parse(saved) : true;
    this.modeSubject = new BehaviorSubject<boolean>(initialValue);
  }

  get classicMode$() {
    return this.modeSubject.asObservable();
  }

  toggleMode(): void {
    const current = !this.modeSubject.value;
    this.setMode(current);
  }

  setMode(value: boolean): void {
    this.modeSubject.next(value);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
  }

  get currentValue(): boolean {
    return this.modeSubject.value;
  }
}
