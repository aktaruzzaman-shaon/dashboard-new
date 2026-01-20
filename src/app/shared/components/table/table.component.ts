import { Component } from '@angular/core';
import { Booking } from './table.types';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  selectedRowReference: string = '';

  headers = [
    'Travel Date',
    'Reference',
    'Option Name',
    'Type',
    'Start Time',
    'Duration',
    'Guests',
    'Sold',
    'Confirmation',
    'Supplier',
    'Status',
    'User',
    'Provider',
    'Details',
  ];

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
    {
      travelDate: '13 Oct 2024',
      reference: '26465465498464455',
      optionName: 'From Dubai Marina Sightseeing Yacht',
      type: 'Private',
      startTime: '10:00 AM',
      duration: '4 Hours',
      guests: '8Adult 4 Child 2 Infant',
      sold: { cost: 149, sale: 200 },
      confirmation: 'YCTG5498641',
      supplier: 'Karan Verma',
      status: 'Cancelled',
      user: 'Rajesh Verma',
      provider: 'Paramount Tourism',
    },
    {
      travelDate: '13 Oct 2024',
      reference: '264654654984641fd42342',
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
      travelDate: '13 Oct 2024',
      reference: '2646546549846413342342',
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

  onViewDetails(booking: Booking): void {
    console.log('View details:', booking);
  }

  onTransfer(booking: Booking): void {
    console.log('Transfer booking:', booking);
  }

  onSearch(booking: Booking): void {
    console.log('Search booking:', booking);
  }

  onSortColumn(header: string): void {
    console.log('Sort by:', header);
  }

  onReferenceDetails(booking: Booking): void {
    console.log('Reference details clicked:', booking);
    // Will open modal later
  }

  onOptionNameClick(booking: Booking): void {
    console.log('Option name clicked:', booking);
    // Will open modal later
  }

  onSupplierClick(booking: Booking): void {
    console.log('Supplier clicked:', booking);
    // Will open modal later
  }

  getStatusClass(status: string): string {
    const classes = {
      Pending: 'bg-orange-100 text-orange-600',
      Accepted: 'bg-green-100 text-green-600',
      Cancelled: 'bg-red-100 text-red-600',
    };
    return classes[status as keyof typeof classes] || '';
  }
}
