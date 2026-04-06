import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-toggle-component-container',
  imports: [],
  templateUrl: './toggle-component-container.html',
  styleUrl: './toggle-component-container.css',
})
export class ToggleComponentContainer {
  isOpen = input<boolean>(false);
  closed = output<void>();
  closeButton = input<boolean>(true);
  name = input<string>('')
  // zIndex = input<number>(50);

  close() {
    this.closed.emit();
  }
}
