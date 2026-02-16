import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  signal,
  ViewChild,
} from '@angular/core';
export type PopupPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left';
@Component({
  selector: 'app-icon-button-popup',
  imports: [CommonModule, OverlayModule],
  templateUrl: './icon-button-popup.html',
  styleUrl: './icon-button-popup.css',
})
export class IconButtonPopup {
  // Inputs
  position = input<PopupPosition>('bottom-right');
  badgeCount = input<number | undefined>();
  gap = input<number>(8);
  isDisabled = input(false);

  // State
  isOpen = signal(false);
  coords = signal({ top: 0, left: 0 });

  @ViewChild('trigger') trigger!: ElementRef<HTMLElement>;
  @ViewChild('content') content!: ElementRef<HTMLElement>;

  togglePopup() {
    if (this.isOpen()) {
      this.isOpen.set(false);
    } else {
      this.isOpen.set(true);
      // Wait for DOM to render content to measure it
      setTimeout(() => this.calculatePosition());
    }
  }

  private calculatePosition() {
    const btn = this.trigger.nativeElement.getBoundingClientRect();
    const modal = this.content.nativeElement;
    const modalWidth = modal.offsetWidth;
    const modalHeight = modal.offsetHeight;
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (this.position()) {
      case 'top-left':
        // Above the button, aligned to button's left edge
        top = btn.top - modalHeight - gap;
        left = btn.left;
        break;

      case 'top-right':
        // Above the button, aligned to button's right edge
        top = btn.top - modalHeight - gap;
        left = btn.right - modalWidth;
        break;

      case 'bottom-left':
        // Below the button, aligned to button's left edge
        top = btn.bottom + gap;
        left = btn.left;
        break;

      case 'bottom-right':
        // Below the button, aligned to button's right edge
        top = btn.bottom + gap;
        left = btn.right - modalWidth;
        break;

      case 'left':
        // Vertically centered to the left of the icon
        top = btn.top + btn.height / 2 - modalHeight / 2;
        left = btn.left - modalWidth - gap;
        break;
    }

    this.coords.set({ top, left });
  }

  badgeDisplay = computed(() => {
    const count = this.badgeCount();
    return count && count > 0 ? (count > 99 ? '99+' : count) : null;
  });

  @HostListener('document:click', ['$event'])
  outsideClick(event: MouseEvent) {
    if (!this.trigger.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }
}
