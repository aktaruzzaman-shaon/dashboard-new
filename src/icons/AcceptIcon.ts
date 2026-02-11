import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accept-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none">
      <path
        d="M14.0833 0.75L4.91667 9.91667L0.75 5.75"
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
export class AcceptIconComponent {
  @Input() size: number = 24;
}
