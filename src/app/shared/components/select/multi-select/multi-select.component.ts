import {
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface MultiSelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-multi-select',
  imports: [FormsModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
})
export class MultiSelect {
  id = input<string>('');
  zIndex = signal(50);
  label = input<string>('');
  options = input<MultiSelectOption[]>([]);
  placeholder = input('Select');
  isOpen = signal(false);
  search = signal('');
  done = output<{ id: string; values: string[] }>();

  private selectedValues = signal<Set<string>>(new Set());

  /** Filtered options based on search term */
  filteredOptions = computed(() =>
    this.options().filter((o) => o.label.toLowerCase().includes(this.search().toLowerCase())),
  );

  /** Display label showing selected options */
  selectedLabel = computed(() => {
    if (!this.selectedValues().size) return this.placeholder();

    return this.options()
      .filter((o) => this.selectedValues().has(o.value))
      .map((o) => o.label)
      .join(', ');
  });

  constructor(private elementRef: ElementRef) {}

  /** Close dropdown when clicking outside this component */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isOpen()) {
      this.closeDropdown();
    }
  }

  /** Toggle dropdown open/closed */
  toggleDropdown() {
    if (!this.isOpen()) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  private closeDropdown() {
    this.isOpen.set(false);
    this.search.set('');
    this.zIndex.set(50);
  }

  private openDropdown() {
    this.isOpen.set(true);
    this.zIndex.set(9999);
  }

  /** Toggle a single option on/off */
  toggleOption(value: string) {
    const next = new Set(this.selectedValues());
    next.has(value) ? next.delete(value) : next.add(value);
    this.selectedValues.set(next);
  }

  /** Check if an option is currently selected */
  isChecked(value: string): boolean {
    return this.selectedValues().has(value);
  }

  selectAll() {
    const allValues = this.filteredOptions().map((o) => o.value);
    this.selectedValues.set(new Set(allValues));
  }

  clearAll() {
    this.selectedValues.set(new Set());
  }

  /** Emit selected values and close dropdown */
  doneSelection() {
    this.done.emit({
      id: this.id(),
      values: [...this.selectedValues()],
    });
    this.closeDropdown();
  }

  /** Get count of selected items */
  // getSelectedCount(): number {
  //   return this.selectedValues().size;
  // }
}
