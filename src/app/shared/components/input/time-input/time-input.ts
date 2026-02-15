import { Component, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-time-input',
  imports: [],
  templateUrl: './time-input.html',
  styleUrl: './time-input.css',
})
export class TimeInput implements ControlValueAccessor {
  label = signal<string>('Start Time');

  // Internal State Signals
  timeValue = signal<string>('');
  period = signal<'AM' | 'PM'>('PM');
  isDisabled = signal<boolean>(false);

  // Form bridge functions
  private onChange = (value: string) => {};
  private onTouched = () => {};

  // Formats the input and updates the form
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let val = input.value.replace(/\D/g, ''); // Remove non-digits

    if (val.length > 4) val = val.substring(0, 4);

    // Auto-colon logic
    if (val.length >= 3) {
      val = val.slice(0, 2) + ':' + val.slice(2);
    }

    this.timeValue.set(val);
    this.updateForm();
  }

  togglePeriod() {
    if (this.isDisabled()) return;
    this.period.update((p) => (p === 'AM' ? 'PM' : 'AM'));
    this.updateForm();
  }

  private updateForm() {
    // This sends the data back to your travelForm
    this.onChange(`${this.timeValue()} ${this.period()}`);
  }

  // --- ControlValueAccessor Implementation ---

  // 1. When the form sets a value (e.g., travelForm.patchValue)
  writeValue(value: string): void {
    if (value) {
      const [time, p] = value.split(' ');
      this.timeValue.set(time || '');
      this.period.set((p as 'AM' | 'PM') || 'PM');
    }
  }

  // 2. Registers the callback to tell the form the value changed
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // 3. Registers the callback for "touched" state (validation)
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // 4. Handles [disabled] state from the form
  setDisabledState(disabled: boolean): void {
    this.isDisabled.set(disabled);
  }
}
