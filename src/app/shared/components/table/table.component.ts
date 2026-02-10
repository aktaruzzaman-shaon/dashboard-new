import { Component, input, output, signal, computed, model } from '@angular/core';
import { Booking } from './table.types';
import { ModalComponent } from '../modal/modal.component';
import { IconButtonPopup } from '../button/icon-button-popup/icon-button-popup';
import { MultiSelect, MultiSelectOption } from '../select/multi-select/multi-select.component';

@Component({
  selector: 'app-table',
  imports: [ModalComponent, IconButtonPopup, MultiSelect],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  columns = input<{ key: string; label: string }[]>([]);
  columnVisibility = input<Record<string, boolean>>({});
  selectedReferences = new Set<string>();
  selectionChange = output<string[]>();
  referenceDetailsModalOpen = signal<boolean>(false);
  sliderSelectedDate = input<Date | null>(null);
  activeStatus = input<string | null>(null);
  statusWiseRowCountChange = output<Record<string, number>>();
  tableTravelStatus = output<string>();
  openDetail = output<string>();

  showOptionHeaderSelect = signal(false);
  selectedOptions = signal<string[]>([]);

  tableStatus(status: string): void {
    this.tableTravelStatus.emit(status);
  }

  // 🔹 Original bookings data (immutable source)
  private readonly originalBookings: Booking[] = [
    {
      travelDate: '18 Feb 2026',
      reference: '264654654984641',
      optionName: 'From Dubai Marina Sightseeing Yacht',
      type: 'Private',
      startTime: '10:00 AM',
      duration: '4 Hours',
      guests: '8Adult 4 Child 2 Infant',
      sold: { cost: 149, sale: 200 },
      confirmation: 'YCTG5498641',
      supplier: 'Karan Verma',
      status: 'Pending',
      user: 'Rajesh Verma',
      provider: 'Paramount Tourism',
    },
    {
      travelDate: '2 Feb 2026',
      reference: '264654654984642',
      optionName: 'From Dubai Marina Sightseeing Yacht',
      type: 'Private',
      startTime: '10:00 AM',
      duration: '5 Hours',
      guests: '8Adult 4 Child 2 Infant',
      sold: { cost: 149, sale: 200 },
      confirmation: 'YCTG5498641',
      supplier: 'Karan Verma',
      status: 'Accepted',
      user: 'Rajesh Verma',
      provider: 'Paramount Tourism',
    },
    {
      travelDate: '22 Feb 2026',
      reference: '264654654984642111',
      optionName: 'From Dubai Marina Sightseeing Yacht',
      type: 'Private',
      startTime: '10:00 AM',
      duration: '4 Hours',
      guests: '8Adult 4 Child 2 Infant',
      sold: { cost: 149, sale: 200 },
      confirmation: 'YCTG5498641',
      supplier: 'Karan Verma',
      status: 'Accepted',
      user: 'Rajesh Verma',
      provider: 'Paramount Tourism',
    },
    {
      travelDate: '10 Feb 2026',
      reference: '26465465498464234234',
      optionName: 'From Dubai Marina Sightseeing Yacht',
      type: 'Private',
      startTime: '10:00 AM',
      duration: '4 Hours',
      guests: '8Adult 4 Child 2 Infant',
      sold: { cost: 149, sale: 200 },
      confirmation: 'YCTG5498641',
      supplier: 'Karan Verma',
      status: 'Accepted',
      user: 'Rajesh Verma',
      provider: 'Paramount Tourism',
    },
    {
      travelDate: '27 Feb 2026',
      reference: '2646546549846425678',
      optionName: 'From Dubai Marina Sightseeing Yacht',
      type: 'Private',
      startTime: '10:00 AM',
      duration: '7 Hours',
      guests: '8Adult 4 Child 2 Infant',
      sold: { cost: 149, sale: 200 },
      confirmation: 'YCTG5498641',
      supplier: 'Karan Verma',
      status: 'Cancelled',
      user: 'Rajesh Verma',
      provider: 'Paramount Tourism',
    },
  ];

  // demo data for showing the multiselect
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

  // 🔹 Sorting state signals
  currentSortKey = signal<string>('travelDate');
  currentSortType = signal<'asc' | 'desc'>('asc');

  // 🔹 Map display labels to actual property keys
  private readonly keyMap: Record<string, string> = {
    'Travel Date': 'travelDate',
    Reference: 'reference',
    'Option Name': 'optionName',
    Type: 'type',
    'Start Time': 'startTime',
    Duration: 'duration',
    Guests: 'guests',
    Confirmation: 'confirmation',
    Supplier: 'supplier',
    Status: 'status',
    User: 'user',
    Provider: 'provider',
  };

  // updateStatusCounts(data: any[]): void {
  //   const counts: Record<string, number> = {};

  //   for (const row of data) {
  //     counts[row.status] = (counts[row.status] || 0) + 1;
  //   }

  //   this.statusWiseRowCountChange.emit(counts);
  // }

  updateStatusCounts(data: any[]) {
    const counts: Record<string, number> = {
      Pending: 0,
      Accepted: 0,
      Rejected: 0,
      Cancelled: 0,
      All: data.length, // 👈 always original length
    };

    for (const row of data) {
      if (counts[row.status] !== undefined) {
        counts[row.status]++;
      }
    }

    this.statusWiseRowCountChange.emit(counts);
  }

  // 🔹 Computed signal for sorted and filtered bookings
  bookings = computed(() => {
    const key = this.currentSortKey();
    const sortingType = this.currentSortType();
    const filterDate = this.sliderSelectedDate();
    const activeStatus = this.activeStatus();

    const direction = sortingType === 'asc' ? 1 : -1;
    const actualKey = this.keyMap[key] || key;

    let data = [...this.originalBookings];

    this.updateStatusCounts(data);

    // 🔹 Optional date filter (travelDate only)
    if (filterDate) {
      const targetDate = this.normalizeDate(filterDate);
      data = data.filter((booking) => {
        const bookingDate = this.normalizeDate(booking.travelDate);
        return bookingDate === targetDate;
      });
    }

    // 🔹 Optional status filter
    if (activeStatus && activeStatus !== 'All') {
      data = data.filter((booking) => booking.status === activeStatus);
      // this.statusWiseRowCountChange.emit(data.length);
    }

    // Sorting with type-safe key access
    data.sort((a, b) => {
      const valueA = a[actualKey as keyof typeof a];
      const valueB = b[actualKey as keyof typeof b];

      // Handle null/undefined values
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return 1;
      if (valueB == null) return -1;

      // Special handling for travelDate (format: "13 Oct 2024")
      if (actualKey === 'travelDate') {
        const dateA = new Date(valueA as string);
        const dateB = new Date(valueB as string);
        return (dateA.getTime() - dateB.getTime()) * direction;
      }

      // Special handling for duration (format: "4 Hours")
      if (actualKey === 'duration') {
        const numA = parseInt(String(valueA).split(' ')[0], 10);
        const numB = parseInt(String(valueB).split(' ')[0], 10);
        return (numA - numB) * direction;
      }

      // Special handling for nested sold object
      if (actualKey === 'cost' || actualKey === 'sale') {
        const soldA = (a as any).sold;
        const soldB = (b as any).sold;
        const numA = soldA?.[actualKey] ?? 0;
        const numB = soldB?.[actualKey] ?? 0;
        return (numA - numB) * direction;
      }

      // Date comparison
      if (valueA instanceof Date && valueB instanceof Date) {
        return (valueA.getTime() - valueB.getTime()) * direction;
      }

      // Number comparison
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * direction;
      }

      // Boolean comparison
      if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        return (Number(valueA) - Number(valueB)) * direction;
      }

      // Default: Case-insensitive string comparison with locale support
      return (
        String(valueA).toLowerCase().localeCompare(String(valueB).toLowerCase(), undefined, {
          numeric: true,
          sensitivity: 'base',
        }) * direction
      );
    });

    return data;
  });

  constructor() {
    console.log('Slider selected date in table component:', this.sliderSelectedDate());
  }

  isVisible(key: string): boolean {
    return this.columnVisibility()[key] !== false;
  }

  visibleColumnCount(): number {
    return this.columns().filter((col) => this.isVisible(col.key)).length;
  }

  // Date normalizer for filtering
  private normalizeDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }

  // 🔹 Method to trigger sorting (called from template)
  onSortColumn(key: string, sortingType: 'asc' | 'desc' = 'asc'): void {
    this.currentSortKey.set(key);
    this.currentSortType.set(sortingType);
  }

  getStatusClass(status: string): string {
    const map = {
      Pending: 'bg-orange-100 text-orange-600',
      Accepted: 'bg-green-100 text-green-600',
      Cancelled: 'bg-red-100 text-red-600',
    };
    return map[status as keyof typeof map] || '';
  }

  onReferenceDetails(booking: Booking): void {
    console.log('Reference details clicked:', booking);
    // Will open modal later
  }

  //for reference row Details modal operation
  isModalOpen = signal(false);
  isSubmitting = signal(false);

  remarks = signal<string>('');

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }
  // for the details button
  onDetailsButtonClick(ref: string) {
    this.openDetail.emit(ref);
  }

  submitModal(): void {
    console.log('submitted');
    this.isSubmitting.set(true);

    //for loading data
    setTimeout(() => {
      console.log('Submitted Remarks:', this.remarks());

      this.isSubmitting.set(false);
      this.isModalOpen.set(false);
    }, 1500);
  }

  //for table column supplier details modal operation
  isSupplierModalOpen = signal(false);
  isSupplierModalSubmitting = signal(false);
  supplierRemarks = signal<string>('Supplier');

  openSupplierDetailsModal(): void {
    console.log('checked');
    this.isSupplierModalOpen.set(true);
  }

  closeSupplierDetailsModal(): void {
    this.isSupplierModalOpen.set(false);
  }

  submitSupplierModalDetails(): void {
    console.log('submitted');
    this.isSubmitting.set(true);

    //for loading data
    setTimeout(() => {
      console.log('Submitted Remarks:', this.remarks());

      this.isSupplierModalSubmitting.set(false);
      this.isSupplierModalOpen.set(false);
    }, 1500);
  }

  isRowSelected(reference: string): boolean {
    return this.selectedReferences.has(reference);
  }

  toggleRowSelection(booking: Booking, event: Event): void {
    // Prevent triggering row selection when clicking buttons
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }

    if (this.selectedReferences.has(booking.reference)) {
      this.selectedReferences.delete(booking.reference);
    } else {
      this.selectedReferences.add(booking.reference);
    }

    this.emitSelectionChange();
  }

  selectAll(): void {
    this.bookings().forEach((booking) => {
      this.selectedReferences.add(booking.reference);
    });
    this.emitSelectionChange();
  }

  deselectAll(): void {
    this.selectedReferences.clear();
    this.emitSelectionChange();
  }
  // for opening the option name
  selectedHeaderPos = { top: 0, left: 0 };
  openOptionHeaderSelect(event: MouseEvent) {
    event.stopPropagation(); // prevent sort clicks
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    // Save header coordinates
    this.selectedHeaderPos = { top: rect.bottom, left: rect.left };

    this.showOptionHeaderSelect.set(true);
  }

  closeOptionHeaderSelect() {
    this.showOptionHeaderSelect.set(false);
  }

  onCountrySelection(event: any) {
    console.log('Selected country:', event);
    this.showOptionHeaderSelect.set(false);
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.deselectAll();
    } else {
      this.selectAll();
    }
  }

  isAllSelected(): boolean {
    return this.bookings().length > 0 && this.selectedReferences.size === this.bookings().length;
  }

  getSelectedCount(): number {
    return this.selectedReferences.size;
  }

  private emitSelectionChange(): void {
    this.selectionChange.emit(Array.from(this.selectedReferences));
  }
}
