import {
  Component,
  computed,
  effect,
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

export interface NormalizedOption {
  label: string;
  value: any;
  original: any;
}

// A flexible type that covers objects, primitives, or anything
type SelectableItem = Record<string, any> | string | number | boolean | null;

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
  options = input<SelectableItem[]>([]);   // ✅ Accepts any structure
  placeholder = input('Select');
  isOpen = signal(false);
  search = signal('');
  done = output<{ id: string; values: any[] }>();

  labelKey = input<string>('label');
  valueKey = input<string>('value');

  /** Normalize any incoming option shape into a flat {label, value, original} */
  normalizedOptions = computed<NormalizedOption[]>(() => {
    const data = this.options() ?? [];
    const lKey = this.labelKey();
    const vKey = this.valueKey();

    return data.map((opt): NormalizedOption => {
      const isObject = opt !== null && typeof opt === 'object';

      const labelValue = isObject
        ? (opt as Record<string, any>)[lKey]
        : opt;

      const valueValue = isObject
        ? (opt as Record<string, any>)[vKey]
        : opt;   // For primitives, label and value are the same thing

      return {
        label: labelValue != null ? String(labelValue) : '',
        value: valueValue ?? '',
        original: opt,
      };
    });
  });

  private selectedValues = signal<Set<any>>(new Set());

  /** Filtered options based on search term */
  filteredOptions = computed<NormalizedOption[]>(() => {
    const searchTerm = this.search().toLowerCase();
    return this.normalizedOptions().filter((o) =>
      o.label.toLowerCase().includes(searchTerm)
    );
  });

  /** Display label showing selected options */
  selectedLabel = computed(() => {
    const selected = this.selectedValues();
    if (!selected.size) return this.placeholder();

    // Use normalizedOptions so this works for any shape
    return this.normalizedOptions()
      .filter((o) => selected.has(o.value))
      .map((o) => o.label)
      .join(', ');
  });

  constructor(private elementRef: ElementRef) {
    effect(() => {
      console.log('Current Options Received:', this.options());
      console.log('Normalized Data:', this.normalizedOptions());
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isOpen()) {
      this.closeDropdown();
    }
  }

  toggleDropdown() {
    this.isOpen() ? this.closeDropdown() : this.openDropdown();
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

  toggleOption(value: any) {
    const next = new Set(this.selectedValues());
    next.has(value) ? next.delete(value) : next.add(value);
    this.selectedValues.set(next);
  }

  isChecked(value: any): boolean {
    return this.selectedValues().has(value);
  }

  selectAll() {
    const allValues = this.filteredOptions().map((o) => o.value);
    this.selectedValues.set(new Set(allValues));
  }

  clearAll() {
    this.selectedValues.set(new Set());
  }

  doneSelection() {
    this.done.emit({
      id: this.id(),
      values: [...this.selectedValues()],
    });
    this.closeDropdown();
  }
}