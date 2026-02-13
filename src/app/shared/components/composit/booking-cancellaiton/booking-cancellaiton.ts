import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingData } from './type';

@Component({
  selector: 'app-booking-cancellaiton',
  imports: [ReactiveFormsModule],
  templateUrl: './booking-cancellaiton.html',
  styleUrl: './booking-cancellaiton.css',
})
export class BookingCancellaiton {
  bookingData = input<BookingData>({
    refNumber: 'AGT306973008240723',
    guestName: 'Vijay Sharma',
    productName: 'Resort World One | 2 Nights Special Yacht',
    startTime: '08:00 AM',
    duration: '04 Hours',
    guests: '8 Adult 4 Child 2 Infant',
    status: 'Confirmed',
  });
  closeBookingCancelModal = output<void>();

  get bookingDetailsList() {
    return [
      { label: 'Booking Reference Number', value: this.bookingData().refNumber },
      { label: 'Guest Name', value: this.bookingData().guestName },
      { label: 'Product Name', value: this.bookingData().productName },
      { label: 'Trip Start Time', value: this.bookingData().startTime },
      { label: 'Duration', value: this.bookingData().duration },
      { label: 'Number of Guests', value: this.bookingData().guests },
      { label: 'Booking Status', value: this.bookingData().status },
    ];
  }

  cancelForm = new FormGroup({
    cDeskNumber: new FormControl(''),
    supplierFailed: new FormControl(false),
    clientCharge: new FormControl(''),
    supplierCharge: new FormControl(''),
    reason: new FormControl('', Validators.required),
  });

  ngOnInit() {
    // Disable logic for CDesk Number
    this.cancelForm.get('supplierFailed')?.valueChanges.subscribe((failed) => {
      const cDesk = this.cancelForm.get('cDeskNumber');
      if (failed) {
        cDesk?.disable();
        cDesk?.setValue('');
      } else {
        cDesk?.enable();
      }
    });
  }

  onCancel() {
    // if (this.cancelForm.valid) {
    //   console.log('Form Data:', this.cancelForm.getRawValue());
    // }
    console.log("cancelling booking");
    this.closeBookingCancelModal.emit();
  }
}
