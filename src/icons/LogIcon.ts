import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M15.75 8.25C15.75 6.76664 15.3101 5.3166 14.486 4.08323C13.6619 2.84986 12.4906 1.88856 11.1201 1.32091C9.74968 0.75325 8.24168 0.604725 6.78683 0.894114C5.33197 1.1835 3.9956 1.89781 2.9467 2.9467C1.89781 3.9956 1.1835 5.33197 0.894114 6.78683C0.604725 8.24168 0.75325 9.74968 1.32091 11.1201C1.88856 12.4906 2.84986 13.6619 4.08323 14.486C5.3166 15.3101 6.76664 15.75 8.25 15.75M8.25 4.08334V7.22C8.25001 7.52958 8.33625 7.83304 8.49904 8.09636C8.66183 8.35968 8.89474 8.57246 9.17167 8.71084L11.5833 9.91667M14.0833 11.5833V14.0833M14.0833 14.0833V16.5833M14.0833 14.0833H11.5833M14.0833 14.0833H16.5833"
        stroke="#0092E4"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
    `,
  ],
})
export class BookingIconComponent {
  @Input() size: number = 24;
}
