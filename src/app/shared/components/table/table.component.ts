import { Component, input, output, signal } from '@angular/core';
import { Booking } from './table.types';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  imports: [ModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  columns = input<{ key: string; label: string }[]>([]);
  columnVisibility = input<Record<string, boolean>>({});
  selectedReferences = new Set<string>();
  selectionChange = output<string[]>();
  referenceDetailsModalOpen = signal<boolean>(false);

  bookings: Booking[] = [
    {
      travelDate: '13 Oct 2024',
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
      travelDate: '13 Oct 2024',
      reference: '264654654984642',
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
  ];

  isVisible(key: string): boolean {
    return this.columnVisibility()[key] !== false;
  }

  visibleColumnCount(): number {
    return this.columns().filter((col) => this.isVisible(col.key)).length;
  }

  onSortColumn(label: string) {
    console.log('Sort by:', label);
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
    this.referenceDetailsModalOpen.set(true);
    console.log('Reference details clicked:', booking);
    // Will open modal later
  }

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
    console.log("submitted")
    this.isSubmitting.set(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Submitted Remarks:', this.remarks());

      this.isSubmitting.set(false);
      this.isModalOpen.set(false);
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
    this.bookings.forEach((booking) => {
      this.selectedReferences.add(booking.reference);
    });
    this.emitSelectionChange();
  }

  deselectAll(): void {
    this.selectedReferences.clear();
    this.emitSelectionChange();
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.deselectAll();
    } else {
      this.selectAll();
    }
  }

  isAllSelected(): boolean {
    return this.bookings.length > 0 && this.selectedReferences.size === this.bookings.length;
  }

  getSelectedCount(): number {
    return this.selectedReferences.size;
  }

  private emitSelectionChange(): void {
    this.selectionChange.emit(Array.from(this.selectedReferences));
  }
}
