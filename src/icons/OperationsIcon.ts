import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-operations-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
      <path
        d="M7.24167 17.3842H6.49167C3.785 17.3842 2.43083 17.3842 1.59 16.53C0.749167 15.6758 0.75 14.3008 0.75 11.5508V7.38417C0.75 4.63417 0.75 3.25917 1.59167 2.40583C2.43083 1.55 3.785 1.55 6.49167 1.55H8.9525C11.66 1.55 13.2417 1.59667 14.0825 2.45C14.9242 3.305 14.9158 4.63333 14.9158 7.38333V8.3725M11.9542 0.75V2.41667M7.7875 0.75V2.41667M3.62083 0.75V2.41667M4.5 11.5833H7.83333M4.5 7.41667H11.1667"
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
export class OperationsIconComponent {
  @Input() size: number = 24;
}
