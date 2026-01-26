import { Component, computed, effect, input, output } from '@angular/core';
import { StatusButtonData, StatusColor, StatusSize } from './status-button.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-button',
  imports: [CommonModule],
  templateUrl: './status-button.component.html',
  styleUrl: './status-button.component.css',
})
export class StatusButton {
  data = input.required<StatusButtonData>();
  active = input<boolean>(false);
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  color = input<StatusColor>('sky');
  size = input<StatusSize>('md');
  autoSelect = input<boolean>(false);

  clicked = output<StatusButtonData>();

  buttonClasses = computed(() => {
    const base =
      'relative inline-flex items-center gap-2 p-5 rounded-md border transition font-medium bold';

    const sizeMap: Record<StatusSize, string> = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-3 py-3 text-sm',
      lg: 'px-5 py-2.5 text-base',
    };

    const colorMap: Record<StatusColor, string> = {
      sky: 'border-sky-400 text-sky-600',
      green: 'border-green-400 text-green-600',
      red: 'border-red-400 text-red-600',
      yellow: 'border-yellow-400 text-yellow-600',
      gray: 'border-gray-400 text-gray-600',
    };

    const inactive = 'border-gray-300 text-gray-700';
    const disabled = 'opacity-50 cursor-not-allowed';

    return [
      base,
      sizeMap[this.size()],
      this.active() ? colorMap[this.color()] : inactive,
      this.disabled() || this.loading() ? disabled : 'cursor-pointer',
    ].join(' ');
  });

  badgeClasses = computed(() => {
    const colorMap: Record<StatusColor, string> = {
      sky: 'bg-sky-400',
      green: 'bg-green-400',
      red: 'bg-red-400',
      yellow: 'bg-yellow-400',
      gray: 'bg-gray-500',
    };

    return [
      'absolute -top-2 -right-2 min-w-[20px] rounded-full px-1.5 text-center text-xs text-white',
      this.active() ? colorMap[this.color()] : 'bg-gray-500',
    ].join(' ');
  });

  // ===== Auto select on init =====
  constructor() {
    effect(() => {
      if (this.autoSelect() && !this.disabled()) {
        this.clicked.emit(this.data());
      }
    });
  }

  onClick() {
    if (this.disabled() || this.loading()) return;
    this.clicked.emit(this.data());
  }
}
