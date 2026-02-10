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
export type PopupPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
@Component({
  selector: 'app-icon-button-popup',
  imports: [CommonModule],
  templateUrl: './icon-button-popup.html',
  styleUrl: './icon-button-popup.css',
})
export class IconButtonPopup {
  position = input<PopupPosition>('bottom-right');
  badgeCount = input<number | undefined>();
  showCloseButton = input(true);
  closeOnOutsideClick = input(true);
  isDisabled = input(false);
  isOpen = signal(false);

  togglePopup(): void {
    this.isOpen.set(!this.isOpen());
  }

  closePopup(): void {
    this.isOpen.set(false);
  }

  openPopup(): void {
    this.isOpen.set(true);
  }

  badgeDisplay = computed(() => {
    const count = this.badgeCount();
    if (count === undefined || count <= 0) return null;
    return count > 99 ? '99+' : count.toString();
  });

  getPopupPositionClasses(): string {
    const positions = {
      'top-right': 'bottom-full right-0 mb-2',
      'top-left': 'bottom-full left-0 mb-2',
      'bottom-right': 'top-full right-0 mt-2',
      'bottom-left': 'top-full left-0 mt-6',
    };
    return positions[this.position()] || positions['bottom-right'];
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.closePopup();
    }
  }
}
