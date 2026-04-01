import { Component, signal, output } from '@angular/core';

interface Supplier {
  name: string;
  service: string;
  phone: string;
  whatsapp: string;
  email: string;
}

@Component({
  selector: 'app-supplier-details',
  standalone: true,
  imports: [],
  templateUrl: './supplier-details.html',
})
export class SupplierDetails {
  // Using Signals for state management
  readonly referenceNumber = signal('AGT43536801250534');
  readonly optionName = signal('From Dubai Marina Sightseeing Yacht');

  readonly supplier = signal<Supplier>({
    name: 'Ashish Nehra',
    service: 'Yacht',
    phone: '00971567813468',
    whatsapp: '00971567813468',
    email: 'ashishnehra@raynab2b.com',
  });

  // Output signal for closing the modal
  closeModal = output<void>();

  onClose() {
    this.closeModal.emit();
  }
}
