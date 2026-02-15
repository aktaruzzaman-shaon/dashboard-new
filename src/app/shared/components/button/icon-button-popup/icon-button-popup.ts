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
export type PopupPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
@Component({
  selector: 'app-icon-button-popup',
  imports: [CommonModule, OverlayModule],
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
  popupTop = 0;
  popupLeft = 0;

  // togglePopup(): void {
  //   this.isOpen.set(!this.isOpen());
  // }

  togglePopup(event: MouseEvent) {
    if (!this.isOpen()) {
      // Get the button's exact position on the screen
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

      // Position it 8px below the button
      this.popupTop = rect.bottom + 8;

      // Align it to the left of the button
      this.popupLeft = rect.left;

      this.isOpen.set(true);
    } else {
      this.closePopup();
    }
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
