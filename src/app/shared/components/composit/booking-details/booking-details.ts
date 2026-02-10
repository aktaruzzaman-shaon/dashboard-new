import { Component, input, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'app-booking-details',
  imports: [],
  templateUrl: './booking-details.html',
  styleUrl: './booking-details.css',
})
export class BookingDetails {
  reference = input<string>();
  goBack = output<void>();

  bookingDetails = signal<any>(null);
  isLoading = signal<boolean>(false);

  // ngOnInit() {
  //   this.loadData();
  // }

  // for loading deatails data
  // loadData() {
  //   this.isLoading.set(true);
  //   this.bookingService.getBookingByRef(this.reference).subscribe({
  //     next: (data) => {
  //       this.bookingDetails.set(data);
  //       this.isLoading.set(false);
  //     },
  //     error: () => this.isLoading.set(false),
  //   });
  // }

}
