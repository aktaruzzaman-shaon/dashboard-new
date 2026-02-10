import {
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { InputSelectorComponent } from '../shared/components/input/input-selector/input-selector.component';
import { DateRangeOption } from '../shared/components/input/input-selector/input-selector.types';
import { CalenderComponent, DateRange } from '../shared/components/calender/calender.component';
import { SingleSelectComponent } from '../shared/components/select/single-select/single-select.component';
import { InputCoreComponent } from '../shared/components/input/input-core/input-core.component';
import { SelectMenuComponent } from '../shared/components/select/select-menu/select-menu';
import { SelectMenu } from '../shared/components/select/select-menu/selectMenu.type';
import { ToggleComponentContainer } from '../shared/components/container/toggle-component-container/toggle-component-container';
import { StatusButton } from '../shared/components/status-button/status-button.component';
import { StatusButtonData } from '../shared/components/status-button/status-button.types';
import { ToggleButtonComponent } from '../shared/components/toggle-button/toggle-button.component';
import { TableComponent } from '../shared/components/table/table.component';
import { SettingsButton } from '../shared/components/button/settings-button/settings-button';
import { OutlineButton } from '../shared/components/outline-button/outline-button';
import {
  MultiSelect,
  MultiSelectOption,
} from '../shared/components/select/multi-select/multi-select.component';
import { OptionItem } from '../shared/components/select/select.types';
import { single } from 'rxjs';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { ButtonWithPopup } from '../shared/components/button/button-with-popup/button-with-popup';
import { DateSlider } from '../shared/components/date-slider/date-slider';
import { BookingDetails } from '../shared/components/composit/booking-details/booking-details';
type ColumnKey = string;

type StatusCountMap = Record<string, number>;

export interface CityItem {
  label: string;
  value: number;
}

export interface CountryItem {
  country: string;
  code: string;
  cities: CityItem[];
}

@Component({
  selector: 'app-b2b-dashboard',
  imports: [
    InputSelectorComponent,
    CalenderComponent,
    SingleSelectComponent,
    InputCoreComponent,
    SelectMenuComponent,
    ToggleComponentContainer,
    StatusButton,
    ToggleButtonComponent,
    TableComponent,
    SettingsButton,
    MultiSelect,
    ButtonWithPopup,
    DateSlider,
    ModalComponent,
    BookingDetails,
  ],
  templateUrl: './b2b-dashboard.html',
  styleUrl: './b2b-dashboard.css',
})
export class B2bDashboard {
  //=============== Travel Date range selection input =================

  availableDateRanges: DateRangeOption[] = [
    { id: 'today', label: 'Today', type: 'relative', value: { start: 0, end: 1 } },
    { id: 'tomorrow', label: 'Tomorrow', type: 'relative', value: { start: 1, end: 2 } },
    { id: 'd3-d7', label: 'Day 3 to Day 7', type: 'relative', value: { start: 3, end: 7 } },
    { id: 'd7-d15', label: 'Day 7 to Day 15', type: 'relative', value: { start: 7, end: 15 } },
    { id: 'd15-plus', label: 'Day 15 & Beyond', type: 'relative', value: { start: 15, end: 365 } },
    { id: 'last-90', label: 'Last 90 days', type: 'relative', value: { start: -90, end: 0 } },
    { id: 'custom', label: 'Custom', type: 'custom', value: { start: 0, end: 0 } },
  ];

  currentSelection = signal<DateRangeOption[]>([]);
  onDateRangeSelected(selectedItems: DateRangeOption[]) {
    this.currentSelection.set(selectedItems);
  }

  // ================   For calender only portion======================

  allowedDateRange = signal<DateRange | null>(null);
  selectedDateRange = computed(() => this.currentSelection());
  calendar = viewChild(CalenderComponent);

  // checkign custom add or not
  isCustomMode = computed(() => {
    const ranges = this.selectedDateRange();
    const rangesArray = Array.isArray(ranges) ? ranges : [ranges];
    return rangesArray.some((range) => range.type === 'custom');
  });

  constructor() {
    effect(() => {
      const ranges = this.selectedDateRange();
      this.getDateRange(ranges);
    });
  }

  // here calculate date range from selected options
  // getDateRange(selectedDateRange: DateRangeOption[] | DateRangeOption) {
  //   const startDateArray = [];
  //   const endDateArray = [];

  //   if (!Array.isArray(selectedDateRange)) {
  //     selectedDateRange = [selectedDateRange];
  //   }

  //   for (const singleSelectedRange of selectedDateRange) {
  //     startDateArray.push(singleSelectedRange.value.start);
  //     endDateArray.push(singleSelectedRange.value.end);
  //   }

  //   const finalStartDate = Math.min(...startDateArray);
  //   const finalEndDate = Math.max(...endDateArray);

  //   const today = new Date();
  //   const addDays = (days: number) => {
  //     const d = new Date(today);
  //     d.setDate(today.getDate() + days);
  //     return d;
  //   };

  //   this.allowedDateRange.set({
  //     from: addDays(finalStartDate ?? 0),
  //     to: addDays(finalEndDate),
  //   });
  // }

  // getDateRange(selectedDateRange: DateRangeOption[] | DateRangeOption) {
  //   const ranges = Array.isArray(selectedDateRange) ? selectedDateRange : [selectedDateRange];

  //   const startDateArray: number[] = [];
  //   const endDateArray: number[] = [];

  //   // Check if "Custom" is part of the selection
  //   const hasCustom = ranges.some((range) => range.type === 'custom');

  //   if (hasCustom) {
  //     // 1. Force the values to 0/0 as requested
  //     startDateArray.push(0);
  //     endDateArray.push(0);

  //     // 2. Open the calendar so the user can actually pick their custom range
  //     this.calendar()?.toggleCalendar();
  //   } else {
  //     // 3. Standard logic for non-custom ranges
  //     for (const range of ranges) {
  //       if (range.value) {
  //         startDateArray.push(range.value.start);
  //         endDateArray.push(range.value.end);
  //       }
  //     }
  //   }

  //   // If no ranges were found at all, we shouldn't proceed
  //   if (startDateArray.length === 0) return;

  //   const finalStartDate = Math.min(...startDateArray);
  //   const finalEndDate = Math.max(...endDateArray);

  //   const today = new Date();
  //   const addDays = (days: number) => {
  //     const d = new Date(today);
  //     d.setHours(0, 0, 0, 0); // Normalized to start of day
  //     d.setDate(today.getDate() + days);
  //     return d;
  //   };

  //   // This will now set { from: Today, to: Today } if Custom was clicked
  //   this.allowedDateRange.set({
  //     from: addDays(finalStartDate),
  //     to: addDays(finalEndDate),
  //   });
  // }

  getDateRange(selectedDateRange: DateRangeOption[] | DateRangeOption) {
    const ranges = Array.isArray(selectedDateRange) ? selectedDateRange : [selectedDateRange];

    const startDateArray: number[] = [];
    const endDateArray: number[] = [];

    // Check if "Custom" is part of the selection
    const hasCustom = ranges.some((range) => range.type === 'custom');

    if (hasCustom) {
      // For custom mode, set allowedDateRange to null so all dates are available
      this.allowedDateRange.set(null);

      // Open the calendar so the user can pick their custom range
      setTimeout(() => {
        this.calendar()?.toggleCalendar();
      }, 0);

      return; // Exit early for custom mode
    } else {
      // Standard logic for non-custom ranges
      for (const range of ranges) {
        if (range.value) {
          startDateArray.push(range.value.start);
          endDateArray.push(range.value.end);
        }
      }
    }

    // If no ranges were found at all, we shouldn't proceed
    if (startDateArray.length === 0) return;

    const finalStartDate = Math.min(...startDateArray);
    const finalEndDate = Math.max(...endDateArray);

    const today = new Date();
    const addDays = (days: number) => {
      const d = new Date(today);
      d.setHours(0, 0, 0, 0);
      d.setDate(today.getDate() + days);
      return d;
    };

    this.allowedDateRange.set({
      from: addDays(finalStartDate),
      to: addDays(finalEndDate),
    });
  }

  // Selected travel dates
  travelFrom = signal<Date | null>(null);
  travelTo = signal<Date | null>(null);

  // For setting the date range via input fields
  rangeFromInput: string = '';
  rangeToInput: string = '';

  // setDateRange(): void {
  //   if (this.selectedDateRange().length > 0 && this.selectedDateRange()[0].type === 'custom') {
  //     const calendarInstance = this.calendar();
  //     if (calendarInstance) {
  //       console.log('Toggling calendar for custom range selection');
  //       calendarInstance.toggleCalendar();
  //     }
  //   }

  //   const value = this.getDateRange(this.selectedDateRange()) ?? null;
  //   this.allowedDateRange.set(value);

  //   if (this.rangeFromInput && this.rangeToInput) {
  //     const fromDate = new Date(this.rangeFromInput + 'T00:00:00') || null;
  //     const toDate = new Date(this.rangeToInput + 'T00:00:00') || null;
  //     console.log('Setting date range from inputs:', fromDate, toDate);
  //     // Validate that from is before to
  //     if (fromDate <= toDate) {
  //       this.allowedDateRange.set({ from: fromDate, to: toDate });

  //       // Clear travel dates if they're outside the new range
  //       if (this.travelFrom() && !this.isDateInRange(this.travelFrom()!, fromDate, toDate)) {
  //         this.travelFrom.set(null);
  //       }
  //       if (this.travelTo() && !this.isDateInRange(this.travelTo()!, fromDate, toDate)) {
  //         this.travelTo.set(null);
  //       }
  //     } else {
  //       alert('Range start date must be before or equal to range end date');
  //     }
  //   }
  // }
  setDateRange(): void {
    if (this.selectedDateRange().length > 0 && this.selectedDateRange()[0].type === 'custom') {
      // Remove this block since getDateRange already handles it
      // const calendarInstance = this.calendar();
      // if (calendarInstance) {
      //   console.log('Toggling calendar for custom range selection');
      //   calendarInstance.toggleCalendar();
      // }
    }

    this.getDateRange(this.selectedDateRange()); // Remove the ?? null
    // allowedDateRange is already set inside getDateRange

    if (this.rangeFromInput && this.rangeToInput) {
      const fromDate = new Date(this.rangeFromInput + 'T00:00:00') || null;
      const toDate = new Date(this.rangeToInput + 'T00:00:00') || null;
      console.log('Setting date range from inputs:', fromDate, toDate);

      if (fromDate <= toDate) {
        this.allowedDateRange.set({ from: fromDate, to: toDate });

        if (this.travelFrom() && !this.isDateInRange(this.travelFrom()!, fromDate, toDate)) {
          this.travelFrom.set(null);
        }
        if (this.travelTo() && !this.isDateInRange(this.travelTo()!, fromDate, toDate)) {
          this.travelTo.set(null);
        }
      } else {
        alert('Range start date must be before or equal to range end date');
      }
    }
  }

  clearDateRange(): void {
    this.allowedDateRange.set(null);
    this.rangeFromInput = '';
    this.rangeToInput = '';
    this.clearTravelDates();
  }

  isDateInRange(date: Date, from: Date, to: Date): boolean {
    return date >= from && date <= to;
  }

  onFromDateSelected(date: Date | null): void {
    console.log('From date selected:', date);
    this.travelFrom.set(date);
  }

  onToDateSelected(date: Date | null): void {
    this.travelTo.set(date);
  }

  clearTravelDates(): void {
    this.travelFrom.set(null);
    this.travelTo.set(null);
  }

  // confirmBooking(): void {
  //   if (this.travelFrom() && this.travelTo()) {
  //     alert(
  //       `Booking confirmed!\nFrom: ${this.formatDisplayDate(this.travelFrom()!)}\nTo: ${this.formatDisplayDate(this.travelTo()!)}\nDuration: ${this.calculateTravelDuration()} days`,
  //     );
  //   }
  // }

  formatDisplayDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  // calculate travel duration
  // calculateTravelDuration(): number {
  //   if (!this.travelFrom() || !this.travelTo()) return 0;
  //   const diffTime = Math.abs(this.travelTo()!.getTime() - this.travelFrom()!.getTime());
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   return diffDays;
  // }

  // calculate range duration
  calculateRangeDuration(): number {
    if (!this.allowedDateRange()) return 0;
    const diffTime = Math.abs(
      this.allowedDateRange()!.to.getTime() - this.allowedDateRange()!.from.getTime(),
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  }

  //================ City Select =============================

  protected readonly title = signal('dashboard');
  options = [
    {
      country: 'United Arab Emirates',
      code: 'ae',
      cities: [
        { label: 'Dubai', value: 1 },
        { label: 'Abu Dhabi', value: 2 },
      ],
    },
    {
      country: 'Bangladesh',
      code: 'bd',
      cities: [
        { label: 'Dhaka', value: 3 },
        { label: 'Chittagong', value: 4 },
      ],
    },
  ];

  onSelect(item: any) {
    console.log('Selected item:', item);
  }

  //Supplier Status ====================================

  roleOptions = signal<SelectMenu[]>([
    {
      id: 'fe',
      label: 'Accepted',
      value: { access: ['Tailwind', 'Angular'], level: 'Senior', salary_band: 'A' },
    },
    {
      id: 'be',
      label: 'Rejected',
      value: { access: ['NodeJS', 'PostgreSQL'], level: 'Mid', salary_band: 'B' },
    },
    {
      id: 'qa',
      label: 'Pending',
      value: { access: ['Cypress', 'Playwright'], level: 'Lead', salary_band: 'A' },
    },
    {
      id: 'de',
      label: 'Cancelled',
      value: { access: ['AWS', 'Kubernetes'], level: 'Staff', salary_band: 'S' },
    },
  ]);
  selectedData = signal<any>(null);
  handleData(data: any) {
    console.log('Component Emitted:', data);
    this.selectedData.set(data);
  }

  //Yacht Type =========================================

  // oleOptions = signal<SelectMenu[]>([
  //   {
  //     id: 'fe',
  //     label: 'Accepted',
  //     value: { access: ['Tailwind', 'Angular'], level: 'Senior', salary_band: 'A' },
  //   },
  //   {
  //     id: 'be',
  //     label: 'Rejected',
  //     value: { access: ['NodeJS', 'PostgreSQL'], level: 'Mid', salary_band: 'B' },
  //   },
  //   {
  //     id: 'qa',
  //     label: 'Pending',
  //     value: { access: ['Cypress', 'Playwright'], level: 'Lead', salary_band: 'A' },
  //   },
  //   {
  //     id: 'de',
  //     label: 'Cancelled',
  //     value: { access: ['AWS', 'Kubernetes'], level: 'Staff', salary_band: 'S' },
  //   },
  // ]);

  // selectedData = signal<any>(null);

  // handleData(data: any) {
  //   console.log('Component Emitted:', data);
  //   this.selectedData.set(data);
  // }

  // =========Advance Search Portion==========

  isContainerOpen = signal(false);
  advanceButtonOpen = signal(true);
  open() {
    this.advanceButtonOpen.set(false);
    this.isContainerOpen.set(true);
  }
  close() {
    this.advanceButtonOpen.set(true);
    this.isContainerOpen.set(false);
  }

  //========== Advance Search Portion multiselect=========

  fruitOptions: MultiSelectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Mango', value: 'mango' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Grapes', value: 'grapes' },
    { label: 'Watermelon', value: 'watermelon' },
    { label: 'Pineapple', value: 'pineapple' },
  ];

  colorOptions: MultiSelectOption[] = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Purple', value: 'purple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Pink', value: 'pink' },
    { label: 'Black', value: 'black' },
    { label: 'White', value: 'white' },
  ];

  countryOptions: MultiSelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'Brazil', value: 'br' },
    { label: 'India', value: 'in' },
    { label: 'China', value: 'cn' },
  ];

  selectedFruits: string[] = [];
  selectedColors: string[] = [];
  selectedCountries: string[] = [];

  onFruitSelection(event: { id: string; values: string[] }) {
    console.log('Fruits selected:', event);
    this.selectedFruits = event.values;
  }

  onColorSelection(event: { id: string; values: string[] }) {
    console.log('Colors selected:', event);
    this.selectedColors = event.values;
  }

  onCountrySelection(event: { id: string; values: string[] }) {
    console.log('Countries selected:', event);
    this.selectedCountries = event.values;
  }

  // date slider portion===========================

  sliderSelectedDate = signal<Date | null>(null);
  onSliderDateSelected(date: Date) {
    this.sliderSelectedDate.set(date);
    console.log('Slider selected date:', date);
  }

  //======================= Table portion=======================

  // for status buttons
  // statuses = signal<StatusButtonData[]>([
  //   { label: 'Pending', count: 30, value: 'Pending' },
  //   { label: 'Accepted', count: 12, value: 'Accepted' },
  //   { label: 'Rejected', count: 5, value: 'Rejected' },
  //   { label: 'Cancelled', count: 8, value: 'Cancelled' },
  //   { label: 'All', count: 5, value: 'All' },
  // ]);

  statuses = signal<StatusButtonData[]>([
    { label: 'Pending', value: 'Pending' },
    { label: 'Accepted', value: 'Accepted' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'All', value: 'All' },
  ]);

  activeStatus = signal<string | null>('All');
  statusWiseRowCount = signal<Record<string, number>>({});
  isLoading = signal(false);
  tableStatusData = signal<string | null>(null);
  // showReminders = signal<boolean>(false);
  // showUpdateSupplier = signal<boolean>(false);
  // showAccept = signal<boolean>(false);
  // showBookings = signal<boolean>(false);

  // for dynamic ui changes based on table status
  uiState = computed(() => {
    const status = this.tableStatusData();

    return {
      showReminders: status === 'Pending',
      showUpdateSupplier: status === 'Accepted',
      showAccept: status === 'Pending',
      showBookings: status === 'Accepted',
    };
  });

  onStatusClick(item: StatusButtonData) {
    this.activeStatus.set(item.value ?? null);
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 1000);
  }

  onTableTravelStatus(status: string) {
    this.tableStatusData.set(status);
    console.log('Travel status from table:', status);
  }

  // table column modification button

  isTableModificationContainerOpen = signal(false);
  openTableRowModificationContainerToggle(isOpen: boolean) {
    this.isTableModificationContainerOpen.set(isOpen);
  }

  // Booking Details Management
  showBookingDetail = signal(false);
  selectedReference = signal<string | null>(null);

  openBookingDetail(reference: string) {
    this.selectedReference.set(reference);
    this.showBookingDetail.set(true);
  }

  closeBookingDetail() {
    this.showBookingDetail.set(false);
    this.selectedReference.set(null);
  }

  //Table Column Customization toggle buttons==================

  tableColumns = [
    { key: 'travelDate', label: 'Travel Date' },
    { key: 'reference', label: 'Reference' },
    { key: 'optionName', label: 'Option Name' },
    { key: 'type', label: 'Type' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'duration', label: 'Duration' },
    { key: 'guests', label: 'Guests' },
    { key: 'sold', label: 'Sold' },
    { key: 'confirmation', label: 'Confirmation' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'status', label: 'Status' },
    { key: 'user', label: 'User' },
    { key: 'provider', label: 'Provider' },
    { key: 'actions', label: 'Actions' },
  ];

  // 🔹 visibility state per column
  columnVisibility = signal<Record<ColumnKey, boolean>>(
    Object.fromEntries(this.tableColumns.map((col) => [col.key, true])),
  );

  // 🔹 called from toggle component
  onFilterUpdate(columnKey: ColumnKey, isActive: boolean) {
    this.columnVisibility.update((state) => ({
      ...state,
      [columnKey]: isActive,
    }));
  }

  //table refenence deatail modal

  // 🔹 reset button logic
  // resetColumns() {
  //   this.columnVisibility.set(Object.fromEntries(this.tableColumns.map((col) => [col.key, true])));
  // }

  // for only table porttion
  openColumnSettings() {
    this.isTableModificationContainerOpen.set(true);
  }

  resetToDefault() {
    this.columnVisibility.set(Object.fromEntries(this.tableColumns.map((col) => [col.key, true])));
  }

  //for table supplier modal operation
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

  //reminder button
  reminderModalOpen = signal<boolean>(false);
  sendReminder(value: boolean) {
    this.reminderModalOpen.set(value);
  }

  onSelectionChange(selectedReferences: string[]): void {
    console.log('Selected references:', selectedReferences);
  }
}
