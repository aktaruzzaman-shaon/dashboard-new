import { Component, input, output, signal } from '@angular/core';
import { InputSelectorComponent } from '../shared/components/input/input-selector/input-selector.component';
import { DateRangeOption } from '../shared/components/input/input-selector/input-selector.types';
import { CalenderComponent } from '../shared/components/calender/calender.component';
import { SingleSelectComponent } from '../shared/components/select/single-select/single-select.component';
import { InputCoreComponent } from '../shared/components/input/input-core/input-core.component';
import { SelectMenuComponent } from '../shared/components/select/select-menu/select-menu';
import { SelectMenu } from '../shared/components/select/select-menu/selectMenu.type';
import { ToggleComponentContainer } from '../shared/components/container/toggle-component-container/toggle-component-container';

@Component({
  selector: 'app-b2b-dashboard',
  imports: [
    InputSelectorComponent,
    CalenderComponent,
    SingleSelectComponent,
    InputCoreComponent,
    SelectMenuComponent,
    ToggleComponentContainer,
  ],
  templateUrl: './b2b-dashboard.html',
  styleUrl: './b2b-dashboard.css',
})
export class B2bDashboard {
  // Travel Date range selection input ===========================
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

  //Travel Date FROM and TO  ====================================
  travelDateTo = signal<Date | null>(null);
  travelDateFrom = signal<Date | null>(null);
  onDateToSelected(date: Date): void {
    console.log(date);
    this.travelDateTo.set(date);
    console.log('Travel Date To:', date);
  }

  //City Select =============================
  protected readonly title = signal('dashboard');
  options = [
    { label: 'Dubai ', value: 1 },
    { label: 'Abu Dhabi', value: 2 },
    { label: 'Shariah', value: 3 },
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
  open() {
    this.isContainerOpen.set(true);
  }
  close() {
    this.isContainerOpen.set(false);
  }
}
