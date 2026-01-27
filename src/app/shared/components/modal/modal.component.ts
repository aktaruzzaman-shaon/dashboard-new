import { Component, computed, HostListener, input, output } from '@angular/core';
import { ModalSize } from './modal.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})

export class ModalComponent {
  open = input<boolean>(false);
  title = input<string>('');
  size = input<ModalSize>('md');

  // ui config
  hideFooter = input<boolean>(false);
  disableBackdropClose = input<boolean>(false);

  submitText = input<string>('Submit');
  cancelText = input<string>('Cancel');
  disableSubmit = input<boolean>(false);
  loading = input<boolean>(false);

  close = output<void>();
  submit = output<void>();

  modalWidth = computed(() => {
    const map: Record<ModalSize, string> = {
      sm: 'max-w-sm',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
      full: 'max-w-full h-full rounded-none',
    };
    return map[this.size()];
  });

  onClose(): void {
    if (this.disableBackdropClose()) return;
    this.close.emit();
  }

  onSubmit(): void {
    if (this.disableSubmit() || this.loading()) return;
    this.submit.emit();
  }

  //  // ───────── ESC Support ─────────
  // @HostListener('document:keydown.escape')
  // onEsc(): void {
  //   if (this.open()) {
  //     this.close.emit();
  //   }
  // }
}
