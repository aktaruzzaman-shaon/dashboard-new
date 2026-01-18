import { Component, signal } from '@angular/core';
import { ButtonComponent } from './shared/components/button/button.component';
import { SingleSelectComponent } from './shared/components/select/single-select/single-select.component';
import { TableComponent } from './shared/components/table/table.component';
import { CalenderComponent } from './shared/components/calender/calender.component';
import { StatusButtonData } from './shared/components/status-button/status-button.types';
import { StatusButton } from './shared/components/status-button/status-button.component';
import { ToggleButtonComponent } from "./shared/components/toggle-button/toggle-button.component";

@Component({
  selector: 'app-root',
  imports: [
    ButtonComponent,
    SingleSelectComponent,
    TableComponent,
    CalenderComponent,
    StatusButton,
    ToggleButtonComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // /----- for select component --------/
  protected readonly title = signal('dashboard');
  options = [
    { label: 'Dubai ', value: 1 },
    { label: 'Abu Dhabi', value: 2 },
    { label: 'Shariah', value: 3 },
  ];

  onSelect(item: any) {
    console.log('Selected item:', item);
  }

  //---------for date picker component-------/
  // Travel date state
  travelDateTo = signal<Date | null>(null);

  // Called when date-picker emits selected date
  onDateToSelected(date: Date): void {
    console.log(date);
    this.travelDateTo.set(date);
    console.log('Travel Date To:', date);
  }

  // ----- for statu-button-----
  statuses = signal<StatusButtonData[]>([
    { label: 'Pending', count: 30, value: 'pending' },
    { label: 'Approved', count: 12, value: 'approved' },
    { label: 'Rejected', count: 5, value: 'rejected' },
  ]);

  activeStatus = signal<string | null>(null);
  isLoading = signal(false);

  onStatusClick(item: StatusButtonData) {
    this.activeStatus.set(item.value ?? null);

    // Example: API call
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 1000);
  }

  //toggle button
  showStartTime = signal(false);
  tableData = [
    { id: 1, name: 'Meeting', time: '10:00 AM' },
    { id: 2, name: 'Lunch', time: '1:00 PM' },
  ];

  onFilterUpdate(isActive: boolean) {
    console.log('Toggle state is now:', isActive);
    // Logic to filter your data source goes here
  }
}
