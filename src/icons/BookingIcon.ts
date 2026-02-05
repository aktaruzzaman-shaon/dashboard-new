import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2.05105 7.78406C1.84438 7.78406 1.65522 7.61573 1.66438 7.39656C1.72022 6.11156 1.87688 5.2749 2.31438 4.61323C2.56393 4.23617 2.87689 3.90517 3.23938 3.6349C4.21022 2.91406 5.58105 2.91406 8.32438 2.91406H11.6694C14.4127 2.91406 15.7835 2.91406 16.756 3.6349C17.1152 3.90156 17.4285 4.2324 17.6802 4.61323C18.1177 5.2749 18.2744 6.11156 18.3302 7.39656C18.3394 7.61573 18.1502 7.78406 17.9427 7.78406C16.7877 7.78406 15.851 8.7749 15.851 9.9974C15.851 11.2199 16.7877 12.2107 17.9427 12.2107C18.1502 12.2107 18.3394 12.3791 18.3302 12.5991C18.2744 13.8832 18.1177 14.7199 17.6802 15.3824C17.4306 15.7592 17.1176 16.0899 16.7552 16.3599C15.7835 17.0807 14.4127 17.0807 11.6694 17.0807H8.32522C5.58188 17.0807 4.21105 17.0807 3.23855 16.3599C2.87635 16.0896 2.56368 15.7586 2.31438 15.3816C1.87688 14.7199 1.72022 13.8832 1.66438 12.5982C1.65522 12.3791 1.84438 12.2107 2.05105 12.2107C3.20605 12.2107 4.14272 11.2199 4.14272 9.9974C4.14272 8.7749 3.20605 7.78406 2.05105 7.78406Z"
        stroke="#9A9A9A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 15L7.5 16.6667"
        stroke="#9A9A9A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 3.33594L7.5 5.0026"
        stroke="#9A9A9A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 8.33594L7.5 11.6693"
        stroke="#9A9A9A"
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
