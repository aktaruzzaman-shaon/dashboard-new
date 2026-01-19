import { DatePipe } from '@angular/common';
import { Component, computed, effect, ElementRef, output, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-slider',
  imports: [DatePipe],
  templateUrl: './date-slider.html',
  styleUrl: './date-slider.css',
})
export class DateSlider {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  // State Management with Signals
  selectedDate = signal(new Date());
  activeDate = signal<string>(new Date().toDateString());

  // Emits the current date object whenever the month changes (for API calls)
  monthChanged = output<Date>();
  dateSelected = output<Date>();

  // Computed signal to generate days for the current selected month
  daysInMonth = computed(() => {
    const date = this.selectedDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];

    // Get total days in month
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDay; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  });

  constructor() {
    // Trigger API logic whenever the month changes
    effect(() => {
      this.monthChanged.emit(this.selectedDate());
    });
  }

  changeMonth(delta: number) {
    const current = this.selectedDate();
    const newDate = new Date(current.getFullYear(), current.getMonth() + delta, 1);
    this.selectedDate.set(newDate);
  }

  selectDate(date: Date) {
    this.activeDate.set(date.toDateString());
    this.dateSelected.emit(date);
  }
  scroll(direction: 'left' | 'right') {
    const container = this.scrollContainer.nativeElement;
    const scrollAmount = 200;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
}
