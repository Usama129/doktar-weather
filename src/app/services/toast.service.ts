import {Injectable, signal} from '@angular/core';
import {Toast} from '../models/toast';

@Injectable({ providedIn: 'root' })
export class ToastService {

  readonly toasts = signal<Toast[]>([]);

  show(message: string, type: string = 'primary'): void {
    const toast = { message, type };
    this.toasts.update(list => [...list, toast]);
    setTimeout(() => this.remove(toast), 3000);
  }

  remove(toast: Toast) {
    this.toasts.update(list => list.filter(t => t !== toast));
  }
}
