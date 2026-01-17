import { Component, computed, input, output } from '@angular/core';
import { ButtonSize, ButtonVariant } from './button.types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  
  // -------- inputs ------
  label = input<string>('Button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  variant = input<ButtonVariant>('solid');
  size = input<ButtonSize>('md');

  // ───────── Output ─────────
  buttonClick = output<void>();

  // ───────── Computed classes ─────────
  sizeClasses = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  });

  variantClasses = computed(() => {
    if (this.variant() === 'outline') {
      return 'border border-sky-500 text-sky-500 hover:bg-sky-50';
    }
    return 'bg-sky-500 text-white hover:bg-sky-600';
  });

  isDisabled = computed(() => this.disabled() || this.loading());

  // ───────── Click handler ─────────
  onClick(): void {
    if (this.isDisabled()) return;
    this.buttonClick.emit();
  }
}
