import { Component, input, output, signal } from '@angular/core';
import { InputCoreComponent } from '../../input/input-core/input-core.component';
import { OutlineButton } from '../../outline-button/outline-button';

export interface AcknowledgeAcceptData {
  name: string;
  confirmationNumber: string;
}

@Component({
  selector: 'app-acknowledge-and-accept',
  imports: [InputCoreComponent, OutlineButton],
  templateUrl: './acknowledge-and-accept.html',
  styleUrl: './acknowledge-and-accept.css',
})
export class AcknowledgeAndAccept {
  // Signal-based input
  userName = input.required<string>();

  // Signal-based outputs
  save = output<AcknowledgeAcceptData>();
  close = output<void>();

  // Signal for confirmation number
  confirmationNumber = signal<string>('');

  onSave(): void {
    const data: AcknowledgeAcceptData = {
      name: this.userName(),
      confirmationNumber: this.confirmationNumber().trim(),
    };
    this.save.emit(data);
  }

  onClose(): void {
    this.close.emit();
  }

  updateConfirmationNumber(value: string): void {
    this.confirmationNumber.set(value);
    this.onClose()
  }
}
