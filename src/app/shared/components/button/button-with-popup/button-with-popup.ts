import { Component, input, signal } from '@angular/core';
import { ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'app-button-with-popup',
  imports: [ɵEmptyOutletComponent],
  templateUrl: './button-with-popup.html',
  styleUrl: './button-with-popup.css',
})
export class ButtonWithPopup {
  label = input<string>('Open Menu');
  isOpen = signal(false);
  disabled = input<boolean>(false);

  toggle() {
    if (!this.disabled()) {
      this.isOpen.update((v) => !v);
    }
  }

  close() {
    this.isOpen.set(false);
  }
}
