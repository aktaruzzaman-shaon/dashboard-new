import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-close-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 15L15 5M5 5L15 15"
        stroke="#DC232F"
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
export class CloseIconComponent {
  @Input() size: number = 24;
}
