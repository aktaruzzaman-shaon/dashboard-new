import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 17 19" fill="none">
      <path
        d="M13.8751 7.175V6.5875C13.8751 3.36333 11.3551 0.75 8.25005 0.75C5.14505 0.75 2.62505 3.36333 2.62505 6.5875V7.175C2.62605 7.87629 2.42592 8.56317 2.04839 9.15417L1.12505 10.5917C0.282552 11.9042 0.925885 13.6883 2.39172 14.1033C6.22181 15.1891 10.2783 15.1891 14.1084 14.1033C15.5742 13.6883 16.2176 11.9042 15.3751 10.5925L14.4517 9.155C14.0739 8.56409 13.8735 7.87721 13.8742 7.17583L13.8751 7.175Z"
        stroke="#0092E4"
        stroke-width="1.5"
      />
      <path
        d="M4.5 14.9141C5.04583 16.3707 6.51833 17.4141 8.25 17.4141C9.98167 17.4141 11.4542 16.3707 12 14.9141"
        stroke="#0092E4"
        stroke-width="1.5"
        stroke-linecap="round"
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
export class NotificationIconComponent {
  @Input() size: number = 24;
}
