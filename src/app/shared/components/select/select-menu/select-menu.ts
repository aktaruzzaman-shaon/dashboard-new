import { Component, ElementRef, HostListener, input, output, signal } from '@angular/core';
import { SelectMenu } from './selectMenu.type';

@Component({
  selector: 'app-select-menu',
  imports: [],
  templateUrl: './select-menu.html',
  styleUrl: './select-menu.css',
})
export class SelectMenuComponent {
  // Signal Inputs
  label = input<string>('');
  options = input.required<SelectMenu[]>();
  placeholder = input<string>('Select an option');

  // Signal Output
  onSelection = output<any>();

  // State Signals
  isOpen = signal(false);
  selectedOption = signal<SelectMenu | null>(null);

  uniqueId = `select-${Math.random().toString(36).substring(2, 9)}`;

  constructor(private elementRef: ElementRef) {}

  toggleDropdown() {
    this.isOpen.update((v) => !v);
  }

  selectOption(option: SelectMenu) {
    this.selectedOption.set(option);
    this.isOpen.set(false);
    this.onSelection.emit(option.value);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
