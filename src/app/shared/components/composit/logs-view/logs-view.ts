import { Component, inject, input, output } from '@angular/core';
import { BookingDetailsFacade } from '../../../../b2b-dashboard/services/facades/bookingDetails.facade';

export interface LogEntry {
  dateTime: string;
  employeeName: string;
  email: string;
  action: string;
}

@Component({
  selector: 'app-logs-view',
  imports: [],
  templateUrl: './logs-view.html',
  styleUrl: './logs-view.css',
})
export class LogsView {
  // Input signals for the header info and log data ====
  referenceNumber = input<string>('AGT43536801250534');
  optionName = input<string>('From Dubai Marina Sightseeing Yacht');
  logViewClose = output<void>();
  logs = inject(BookingDetailsFacade)

  // Input signal for the array of logs ================


  onClose() {
    this.logViewClose.emit();
  }

  // Table Headers defined in component logic
  tableHeaders = ['Date & Time', 'Employee Name', 'Email', 'Actions'];
}
