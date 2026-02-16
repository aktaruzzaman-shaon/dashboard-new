import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-update-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M9.9974 8.33073C11.8383 8.33073 13.3307 6.83835 13.3307 4.9974C13.3307 3.15645 11.8383 1.66406 9.9974 1.66406C8.15645 1.66406 6.66406 3.15645 6.66406 4.9974C6.66406 6.83835 8.15645 8.33073 9.9974 8.33073Z"
        stroke="#0092E4"
        stroke-width="1.5"
      />
      <path
        d="M9.9974 17.4948C13.2191 17.4948 15.8307 16.0024 15.8307 14.1615C15.8307 12.3205 13.2191 10.8281 9.9974 10.8281C6.77573 10.8281 4.16406 12.3205 4.16406 14.1615C4.16406 16.0024 6.77573 17.4948 9.9974 17.4948Z"
        stroke="#0092E4"
        stroke-width="1.5"
      />
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;j 
        vertical-align: middle;
      }
    `,
  ],
})
export class UpdateIconComponent {
  @Input() size: number = 24;
}
