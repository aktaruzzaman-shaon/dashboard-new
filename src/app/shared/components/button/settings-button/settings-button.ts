import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-settings-button',
  imports: [],
  templateUrl: './settings-button.html',
  styleUrl: './settings-button.css',
})
export class SettingsButton {
  // Inputs using signals
  label = input<string>('Column Selection');
  buttonLabel = input<string>('Default');

  // Outputs (Events)
  onButtonClick = output<void>();
  onIconClick = output<void>();

  handleButtonClick() {
    this.onButtonClick.emit();
  }

  handleIconClick() {
    this.onIconClick.emit();
  }
}
