import {
  Component,
  effect,
  EventEmitter,
  input,
  Input,
  output,
  Output,
  signal,
} from '@angular/core';

export interface DateRange {
  from: Date;
  to: Date;
}

@Component({
  selector: 'app-calender',
  imports: [],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css',
})
export class CalenderComponent {
  // Inputs
  // label = input<string>('Select Date');
  // placeholder = input<string>('DD/MM/YYYY');
  // dateRange = input<DateRange | null>(null); // External allowed date range (comes from parent)
  // selectedDate = input<Date | null>(null); // Current selected date for this field

  // Output
  // dateSelected = output<Date | null>();

  // Inputs
  label = input<string>('Select Date');
  placeholder = input<string>('DD/MM/YYYY');
  dateRange = input<DateRange | null>(null);
  travelFromDate = input<Date | null>(null);
  travelToDate = input<Date | null>(null);
  showDateType = input<'fromDate' | 'toDate'>('fromDate');
  isCustomMode = input<boolean>(false);

  // Outputs
  fromDateSelected = output<Date | null>();
  toDateSelected = output<Date | null>();

  // Internal state
  // tempSelectedDate = signal<Date | null>(null);
  // isOpen = false;
  // Internal state
  tempFromDate = signal<Date | null>(null);
  tempToDate = signal<Date | null>(null);
  isOpen = false;

  currentMonth = new Date();
  nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor() {
    // Sync temp dates with selected dates from parent
    effect(() => {
      this.tempFromDate.set(this.travelFromDate());
      this.tempToDate.set(this.travelToDate());
    });
  }

  toggleCalendar(): void {
    this.isOpen = !this.isOpen;

    // Set current month based on date range or selected dates
    if (this.dateRange()) {
      this.currentMonth = new Date(
        this.dateRange()!.from.getFullYear(),
        this.dateRange()!.from.getMonth(),
        1,
      );
    } else if (this.tempFromDate()) {
      this.currentMonth = new Date(
        this.tempFromDate()!.getFullYear(),
        this.tempFromDate()!.getMonth(),
        1,
      );
    } else {
      this.currentMonth = new Date();
    }

    this.nextMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
  }

  closeCalendar(): void {
    this.isOpen = false;
  }

  getMonthName(date: Date): string {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  getDaysInMonth(date: Date): (number | null)[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }

  // selectDate(day: number | null, isNextMonth: boolean): void {
  //   if (!day) return;

  //   const selectedDate = new Date(
  //     isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
  //     isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
  //     day,
  //   );

  //   // Check if date is within allowed range
  //   if (!this.isDateAllowed(selectedDate)) {
  //     return;
  //   }

  //   this.tempSelectedDate.set(selectedDate);
  // }

  selectDate(day: number | null, isNextMonth: boolean): void {
    if (!day) return;

    const selectedDate = new Date(
      isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
      isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
      day,
    );

    // Check if date is within allowed range
    if (!this.isDateAllowed(selectedDate)) {
      return;
    }

    // Check if clicking on an already selected date to change it
    const clickedOnFromDate =
      this.tempFromDate() && this.isSameDay(selectedDate, this.tempFromDate()!);
    const clickedOnToDate = this.tempToDate() && this.isSameDay(selectedDate, this.tempToDate()!);

    if (clickedOnFromDate) {
      // Clicking on from date again - allow deselection
      this.tempFromDate.set(null);
      return;
    }

    if (clickedOnToDate) {
      // Clicking on to date again - allow deselection
      this.tempToDate.set(null);
      return;
    }

    // Smart selection logic for new date selection
    if (!this.tempFromDate() && !this.tempToDate()) {
      // No dates selected - set as from date
      this.tempFromDate.set(selectedDate);
    } else if (this.tempFromDate() && !this.tempToDate()) {
      // Only from date exists - set as to date
      if (selectedDate < this.tempFromDate()!) {
        // If selected date is before from date, swap them
        this.tempToDate.set(this.tempFromDate());
        this.tempFromDate.set(selectedDate);
      } else {
        this.tempToDate.set(selectedDate);
      }
    } else if (!this.tempFromDate() && this.tempToDate()) {
      // Only to date exists - set as from date
      if (selectedDate > this.tempToDate()!) {
        // If selected date is after to date, swap them
        this.tempFromDate.set(this.tempToDate());
        this.tempToDate.set(selectedDate);
      } else {
        this.tempFromDate.set(selectedDate);
      }
    } else {
      // Both dates exist - determine which one to replace based on proximity
      const fromDate = this.tempFromDate()!;
      const toDate = this.tempToDate()!;

      const diffFromSelectedToFrom = Math.abs(selectedDate.getTime() - fromDate.getTime());
      const diffFromSelectedToTo = Math.abs(selectedDate.getTime() - toDate.getTime());

      // Replace the date that's closer to the clicked date
      if (diffFromSelectedToFrom < diffFromSelectedToTo) {
        // Closer to from date - replace from date
        if (selectedDate > toDate) {
          // If new from date is after to date, swap them
          this.tempFromDate.set(toDate);
          this.tempToDate.set(selectedDate);
        } else {
          this.tempFromDate.set(selectedDate);
        }
      } else {
        // Closer to to date - replace to date
        if (selectedDate < fromDate) {
          // If new to date is before from date, swap them
          this.tempToDate.set(fromDate);
          this.tempFromDate.set(selectedDate);
        } else {
          this.tempToDate.set(selectedDate);
        }
      }
    }
  }

  // Check if date is within the allowed range
  isDateAllowed(date: Date): boolean {
    if (!this.dateRange() || this.isCustomMode()) return true;

    const range = this.dateRange()!;

    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const rangeFrom = new Date(
      range.from.getFullYear(),
      range.from.getMonth(),
      range.from.getDate(),
    );
    const rangeTo = new Date(range.to.getFullYear(), range.to.getMonth(), range.to.getDate());

    return dateOnly >= rangeFrom && dateOnly <= rangeTo;
  }

  // Check if date is selected
  // isSelected(day: number | null, isNextMonth: boolean): boolean {
  //   if (!day || !this.tempSelectedDate()) return false;

  //   const date = new Date(
  //     isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
  //     isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
  //     day,
  //   );

  //   return this.isSameDay(date, this.tempSelectedDate()!);
  // }

  // Check if date is selected (either from or to)
  isSelected(day: number | null, isNextMonth: boolean): boolean {
    if (!day) return false;

    const date = new Date(
      isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
      isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
      day,
    );

    const isFromDate = this.tempFromDate() && this.isSameDay(date, this.tempFromDate()!);
    const isToDate = this.tempToDate() && this.isSameDay(date, this.tempToDate()!);

    return !!isFromDate || !!isToDate;
  }

  // Check if date is in selected range
  isInSelectedRange(day: number | null, isNextMonth: boolean): boolean {
    if (!day || !this.tempFromDate() || !this.tempToDate()) return false;

    const date = new Date(
      isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
      isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
      day,
    );

    return date > this.tempFromDate()! && date < this.tempToDate()!;
  }

  // Check if date is within the allowed range (for highlighting)
  isInAllowedRange(day: number | null, isNextMonth: boolean): boolean {
    if (!day || !this.dateRange()) return false;
    if (this.isCustomMode()) return true;

    const date = new Date(
      isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
      isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
      day,
    );

    return this.isDateAllowed(date);
  }

  // Check if date is the start of allowed range
  isRangeStart(day: number | null, isNextMonth: boolean): boolean {
    if (!day || !this.dateRange()) return false;

    const date = new Date(
      isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
      isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
      day,
    );

    return this.isSameDay(date, this.dateRange()!.from);
  }

  // Check if date is the end of allowed range
  isRangeEnd(day: number | null, isNextMonth: boolean): boolean {
    if (!day || !this.dateRange()) return false;

    const date = new Date(
      isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
      isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
      day,
    );

    return this.isSameDay(date, this.dateRange()!.to);
  }

  // Check if date should be disabled
  isDisabled(day: number | null, isNextMonth: boolean): boolean {
    if (!day) return true;

    const date = new Date(
      isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
      isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
      day,
    );

    return !this.isDateAllowed(date);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  previousMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1,
    );
    this.nextMonth = new Date(this.nextMonth.getFullYear(), this.nextMonth.getMonth() - 1, 1);
  }

  nextMonthNav(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1,
    );
    this.nextMonth = new Date(this.nextMonth.getFullYear(), this.nextMonth.getMonth() + 1, 1);
  }

  // reset(): void {
  //   this.tempSelectedDate.set(null);
  // }

  reset(): void {
    this.tempFromDate.set(null);
    this.tempToDate.set(null);
  }

  // apply(): void {
  //   this.dateSelected.emit(this.tempSelectedDate());
  //   this.isOpen = false;
  // }

  apply(): void {
    this.fromDateSelected.emit(this.tempFromDate());
    this.toDateSelected.emit(this.tempToDate());
    this.isOpen = false;
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // getDisplayValue(): string {
  //   return this.formatDate(this.tempSelectedDate());
  // }

  getDisplayValue(): string {
    if (this.tempFromDate() && this.showDateType() === 'fromDate') {
      return this.formatDate(this.tempFromDate());
    } else if (
      this.dateRange() &&
      this.dateRange()?.from.toString() != 'Invalid Date' &&
      this.showDateType() === 'fromDate'
    ) {
      return this.formatDate(this.dateRange()?.from || null);
    }

    if (this.tempToDate() && this.showDateType() === 'toDate') {
      return this.formatDate(this.tempToDate());
    } else if (
      this.dateRange() &&
      this.dateRange()?.to.toString() != 'Invalid Date' &&
      this.showDateType() === 'toDate'
    ) {
      return this.formatDate(this.dateRange()?.to || null);
    }

    return '';
  }
}
