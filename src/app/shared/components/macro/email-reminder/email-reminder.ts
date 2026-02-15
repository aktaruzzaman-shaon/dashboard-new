import { Component, output } from '@angular/core';

@Component({
  selector: 'app-email-reminder',
  imports: [],
  templateUrl: './email-reminder.html',
  styleUrl: './email-reminder.css',
})
export class EmailReminder {
  send = output<void>();
  cancel = output<void>();

  onSend(): void {
    this.send.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
