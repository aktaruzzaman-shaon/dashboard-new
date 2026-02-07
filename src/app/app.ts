import { Component, signal, ViewChild } from '@angular/core';
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
import { DateSlider } from './shared/components/date-slider/date-slider';
import { OutlineButton } from './shared/components/outline-button/outline-button';
import { MultiSelect } from './shared/components/select/multi-select/multi-select.component';
import { B2bDashboard } from './b2b-dashboard/b2b-dashboard';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { RouterModule } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';

//MultiSelect option ITEM
interface OptionItem {
  id: string | number;
  label: string;
  selected?: boolean;
}

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
    DateSlider,
    OutlineButton,
    MultiSelect,
    B2bDashboard,
    Sidebar,
    RouterModule,
    Navbar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // for sidebar and navbar toggling
  @ViewChild(Sidebar) sidebarComponent!: Sidebar;

  onToggleSidebar(): void {
    this.sidebarComponent.toggleSidebar();
  }
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
    { label: 'Pending', value: 'Pending' },
    // { label: 'Approved', count: 12, value: 'approved' },
    // { label: 'Rejected', count: 5, value: 'rejected' },
  ]);

  activeStatus = signal<string | null>(null);
  isLoading = signal(false);

  onStatusClick(item: StatusButtonData) {
    this.activeStatus.set(item.value ?? null);

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
    { id: 'today', label: 'Today', type: 'relative', value: { start: 0, end: 1 } },
    { id: 'tomorrow', label: 'Tomorrow', type: 'relative', value: { start: 1, end: 2 } },
    { id: 'd3-d7', label: 'Day 3 to Day 7', type: 'relative', value: { start: 3, end: 7 } },
    { id: 'd7-d15', label: 'Day 7 to Day 15', type: 'relative', value: { start: 7, end: 15 } },
    { id: 'd15-plus', label: 'Day 15 & Beyond', type: 'relative', value: { start: 15, end: 365 } },
    { id: 'last-90', label: 'Last 90 days', type: 'relative', value: { start: -90, end: 0 } },
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

  //button-outltine usage
  isSaving = signal(false);

  onUpdate() {
    console.log('Update Supplier Clicked');
  }

  onSave() {
    this.isSaving.set(true);
    setTimeout(() => this.isSaving.set(false), 2000);
  }

  //multi select component

  isModalOpenMultiSelect = signal(false);
  products = signal<OptionItem[]>([
    { id: 1, label: 'From Dubai Marina Sightseeing 1', selected: false },
    { id: 2, label: 'From Dubai Marina Sightseeing 2', selected: false },
    { id: 3, label: 'From Dubai Marina Sightseeing 3', selected: false },
    { id: 4, label: 'From Dubai Marina Sightseeing 4', selected: false },
    { id: 5, label: 'From Dubai Marina Sightseeing 5', selected: false },
  ]);
  finalSelection = signal<OptionItem[]>([]);
  openSelector() {
    this.isModalOpenMultiSelect.set(true);
  }
  onSelectionConfirmed(selectedItems: OptionItem[]) {
    this.finalSelection.set(selectedItems);
    console.log('Final Selected Data:', selectedItems);
  }
}
