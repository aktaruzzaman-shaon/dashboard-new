import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-markup-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
      <path
        d="M6.58333 7.41667C8.42428 7.41667 9.91667 5.92428 9.91667 4.08333C9.91667 2.24238 8.42428 0.75 6.58333 0.75C4.74238 0.75 3.25 2.24238 3.25 4.08333C3.25 5.92428 4.74238 7.41667 6.58333 7.41667Z"
        stroke="#9A9A9A"
        stroke-width="1.5"
      />
      <path
        d="M6.58333 16.5807C9.80499 16.5807 12.4167 15.0883 12.4167 13.2474C12.4167 11.4064 9.80499 9.91406 6.58333 9.91406C3.36167 9.91406 0.75 11.4064 0.75 13.2474C0.75 15.0883 3.36167 16.5807 6.58333 16.5807Z"
        stroke="#9A9A9A"
        stroke-width="1.5"
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
export class MarkUpIconComponent {
  @Input() size: number = 24;
}
