import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calender',
  imports: [],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css',
})
export class CalenderComponent {
  @Input() label: string = 'Select Date';
  @Input() placeholder: string = 'DD/MM/YYYY';
  @Input() selectedDate: Date | null = null;
  @Output() dateSelected = new EventEmitter<Date>();

  isOpen = false;
  currentMonth = new Date();
  nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  toggleCalendar(): void {
    this.isOpen = !this.isOpen;
  }

  closeCalendar(): void {
    this.isOpen = false;
  }

  getMonthName(date: Date): string {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  // get days in a month
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

  //selected date
  selectDate(day: number | null, isNextMonth: boolean): void {
    if (!day) return;

    const selectedDate = new Date(
      isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
      isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
      day,
    );

    this.selectedDate = selectedDate;
  }

  //which date is selected
  isSelected(day: number | null, isNextMonth: boolean): boolean {
    if (!day || !this.selectedDate) return false;

    const date = new Date(
      isNextMonth ? this.nextMonth.getFullYear() : this.currentMonth.getFullYear(),
      isNextMonth ? this.nextMonth.getMonth() : this.currentMonth.getMonth(),
      day,
    );

    return (
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() - 1));
    this.nextMonth = new Date(this.nextMonth.setMonth(this.nextMonth.getMonth() - 1));
  }

  nextMonthNav(): void {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() + 1));
    this.nextMonth = new Date(this.nextMonth.setMonth(this.nextMonth.getMonth() + 1));
  }

  reset(): void {
    this.selectedDate = null;
  }

  //finally submit the date
  apply(): void {
    if (this.selectedDate) {
      this.dateSelected.emit(this.selectedDate);
      this.isOpen = false;
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return this.placeholder;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getDisplayValue(): string {
    return this.formatDate(this.selectedDate);
  }
}
