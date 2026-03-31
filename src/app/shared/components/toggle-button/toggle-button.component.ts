import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.css',
})
export class ToggleButtonComponent {
  label = input<string>('Start Time');
  checked = model<boolean>(false);
  filterChanged = output<boolean>();

  toggle() {
    // this.checked.set(!this.checked());
    this.filterChanged.emit(!this.checked());
  }
}
