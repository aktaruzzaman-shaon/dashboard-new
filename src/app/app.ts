import { Component, signal } from '@angular/core';
import { ButtonComponent } from './shared/components/button/button.component';
import { SingleSelectComponent } from './shared/components/select/single-select/single-select.component';
import { TableComponent } from './shared/components/table/table.component';
import { CalenderComponent } from './shared/components/calender/calender.component';
import { StatusButtonData } from './shared/components/status-button/status-button.types';
import { StatusButton } from './shared/components/status-button/status-button.component';
import { ToggleButtonComponent } from './shared/components/toggle-button/toggle-button.component';
import { DateRangeOption } from './shared/components/input/input-selector/input-selector.types';
import { InputSelectorComponent } from './shared/components/input/input-selector/input-selector.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { InputCoreComponent } from './shared/components/input/input-core/input-core.component';
import { DateSlider } from "./shared/components/date-slider/date-slider";

@Component({
  selector: 'app-root',
  imports: [
    ButtonComponent,
    SingleSelectComponent,
    TableComponent,
    CalenderComponent,
    StatusButton,
    ToggleButtonComponent,
    InputSelectorComponent,
    ModalComponent,
    InputCoreComponent,
    DateSlider
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
    // Logic to filter data source goes here
  }

  // Date range selection input
  availableDateRanges: DateRangeOption[] = [
    { id: 'today', label: 'Today', value: { type: 'relative', val: 0 } },
    { id: 'tomorrow', label: 'Tomorrow', value: { type: 'relative', val: 1 } },
    { id: 'd3-d7', label: 'Day 3 to Day 7', value: { type: 'range', start: 3, end: 7 } },
    { id: 'd7-d15', label: 'Day 7 to Day 15', value: { type: 'range', start: 7, end: 15 } },
    { id: 'd15-plus', label: 'Day 15 & Beyond', value: { type: 'range', start: 15, end: null } },
    { id: 'last-90', label: 'Last 90 days', value: { type: 'lookback', days: 90 } },
  ];

  currentSelection: DateRangeOption[] = [];

  onDateRangeSelected(selectedItems: DateRangeOption[]) {
    console.log('Received new selection:', selectedItems);
    this.currentSelection = selectedItems;
    // API calls or filtering based on this data
  }

  //modal useage examplel
  isModalOpen = signal(false);
  isSubmitting = signal(false);

  remarks = signal<string>('');

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  submitModal(): void {
    this.isSubmitting.set(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Submitted Remarks:', this.remarks());

      this.isSubmitting.set(false);
      this.isModalOpen.set(false);
    }, 1500);
  }

  //input-core usage example
  username = signal('');
  email = signal('');
  loading = signal(false);

  submit() {
    this.loading.set(true);

    setTimeout(() => {
      console.log({
        username: this.username(),
        email: this.email(),
      });
      this.loading.set(false);
    }, 1500);
  }

  //date slider
  demoData = signal<any[]>([]);
  loadingDate = signal(false);
  currentMonthName = signal('');

  // This runs whenever the user clicks the month arrows in the slider
  fetchDataByMonth(date: Date) {
    this.loading.set(true);
    this.currentMonthName.set(date.toLocaleString('default', { month: 'long' }));

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // Simulate API Call
    console.log(`Fetching API: /api/data?year=${year}&month=${month}`);

    setTimeout(() => {
      this.demoData.set([
        { id: 1, title: `Data item for ${this.currentMonthName()}` },
        { id: 2, title: `Another entry` },
      ]);
      this.loadingDate.set(false);
    }, 800);
  }

  onDateClick(date: Date) {
    console.log('User selected specific day:', date);
  }
}
