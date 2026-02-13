import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-remarks',
  imports: [],
  templateUrl: './remarks.html',
  styleUrl: './remarks.css',
})
export class Remarks {
  // Output to notify parent to close the modal
  closeModal = output<void>();

  // Tracks active view: 'customer' or 'internal'
  activeView = signal<'customer' | 'internal'>('customer');

  // Sample data to map into the template
  customerData = {
    name: 'Vijay Sharma',
    date: '16 Apr 2025',
    time: '08:00 AM',
    flight: 'Air Emirates, AE2356',
    weight: '85Kg',
    remark:
      'In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultricies nibh tristique.',
  };

  internalRemarks = [
    {
      name: 'Vikram Sinha',
      date: '22 Mar 2025',
      time: '08:00 AM',
      text: 'In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque...',
      readAt: '22 Mar 2025 08:00 AM',
    },
    {
      name: 'Arun Kumar',
      date: '27 Mar 2025',
      time: '08:00 AM',
      text: 'In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque...',
      readAt: null,
    },
    {
      name: 'Vikram Sinha',
      date: '27 Mar 2025',
      time: '08:00 AM',
      text: 'In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque...',
      readAt: null,
    },
  ];

  onClose() {
    this.closeModal.emit();
  }
}
