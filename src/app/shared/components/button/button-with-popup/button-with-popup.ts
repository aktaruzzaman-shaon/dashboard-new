import { Component, input, output, signal } from '@angular/core';
import { ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'app-button-with-popup',
  imports: [ɵEmptyOutletComponent],
  templateUrl: './button-with-popup.html',
  styleUrl: './button-with-popup.css',
})
export class ButtonWithPopup {
  label = input<string>('Open Menu');
  isOpen = input<boolean>(false);
  isOpenChange = output<boolean>();
  disabled = input<boolean>(false);
  mode = input<'popup' | 'modal'>('popup');

  toggle() {
    if (!this.disabled()) {
      this.isOpenChange.emit(!this.isOpen());
    }
  }

  close() {
    this.isOpenChange.emit(false);
  }
}
