import { Component, output } from '@angular/core';

@Component({
  selector: 'app-whatsapp-reminder',
  imports: [],
  templateUrl: './whatsapp-reminder.html',
  styleUrl: './whatsapp-reminder.css',
})
export class WhatsappReminder {
  send = output<void>();
  cancel = output<void>();

  onSend(): void {
    this.send.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
