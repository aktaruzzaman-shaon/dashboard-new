import { Component, input, output } from '@angular/core';
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
  // Input signals for the header info and log data
  referenceNumber = input<string>('AGT43536801250534');
  optionName = input<string>('From Dubai Marina Sightseeing Yacht');
  logViewClose = output<void>();

  // Input signal for the array of logs
  logs = input<LogEntry[]>([
    {
      dateTime: '08 Apr 2025 - 10:00 AM',
      employeeName: 'Joy Mathachan',
      email: 'ashishnehra@raynab2b.com',
      action: 'Accepted the booking',
    },
    {
      dateTime: '08 Apr 2025 - 10:00 AM',
      employeeName: 'Joy Mathachan',
      email: 'ashishnehra@raynab2b.com',
      action: 'Email Reminder',
    },
    {
      dateTime: '08 Apr 2025 - 10:00 AM',
      employeeName: 'Joy Mathachan',
      email: 'ashishnehra@raynab2b.com',
      action: 'Cancelled the booking',
    },
    {
      dateTime: '08 Apr 2025 - 10:00 AM',
      employeeName: 'Joy Mathachan',
      email: 'ashishnehra@raynab2b.com',
      action: 'Travel date changed from 12th April 2025 to 14th April 2025',
    },
    {
      dateTime: '08 Apr 2025 - 10:00 AM',
      employeeName: 'Joy Mathachan',
      email: 'ashishnehra@raynab2b.com',
      action: 'Supplier updated from Ashish Nehra to Naresh Kunnud',
    },
  ]);

  onClose() {
    this.logViewClose.emit();
  }

  // Table Headers defined in component logic
  tableHeaders = ['Date & Time', 'Employee Name', 'Email', 'Actions'];
}
