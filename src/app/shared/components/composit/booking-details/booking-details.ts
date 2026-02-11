import { Component, input, OnInit, output, signal } from '@angular/core';
import { IconButtonPopup } from "../../button/icon-button-popup/icon-button-popup";
import { DetailsIconComponent } from '../../../../../icons/DetailsIcon';
import { LogIconComponent } from "../../../../../icons/LogIcon";
import { OutlineButton } from "../../outline-button/outline-button";
import { ButtonComponent } from "../../button/button.component";
import { AcceptIconComponent } from "../../../../../icons/AcceptIcon";
import { BookingIconComponent } from "../../../../../icons/BookingIcon";
import { NotificationIconComponent } from "../../../../../icons/NotificationIcon";

@Component({
  selector: 'app-booking-details',
  imports: [IconButtonPopup, DetailsIconComponent, LogIconComponent, OutlineButton, AcceptIconComponent, BookingIconComponent, NotificationIconComponent],
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
