import { Component, signal } from '@angular/core';
import { ButtonComponent } from './shared/components/button/button.component';
import { SingleSelectComponent } from './shared/components/select/single-select/single-select.component';
import { TableComponent } from './shared/components/table/table.component';
import { CalenderComponent } from './shared/components/calender/calender.component';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent, SingleSelectComponent, TableComponent, CalenderComponent],
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
}
