import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.css',
})
export class ToggleButtonComponent {
  // Configurable label
  label = input<string>('Start Time');

  // Two-way binding for the toggle state
  checked = model<boolean>(false);

  // Event emitted for filtering logic
  filterChanged = output<boolean>();

  toggle() {
    this.checked.set(!this.checked());
    this.filterChanged.emit(this.checked());
  }
}
