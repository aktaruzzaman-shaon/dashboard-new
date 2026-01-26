import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, HostListener, input, model, output, signal } from '@angular/core';
import { OptionItem } from '../select.types';
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
  // title = input<string>('Select Options');
  // options = input.required<OptionItem[]>();
  // // isVisible = signal<boolean>(false);
  // selectedValues = output<OptionItem[]>();
  // searchTerm = signal('');
  // isOpen = signal(false);

  // // Computed Signal for filtering
  // filteredOptions = computed(() => {
  //   const term = this.searchTerm().toLowerCase().trim();
  //   const allOptions = this.options();

  //   if (!term) return allOptions;

  //   return allOptions.filter((opt) => opt.label.toLowerCase().includes(term));
  // });

  // toggleSelectAll() {
  //   const current = this.filteredOptions();
  //   const allSelected = current.every((opt) => opt.selected);
  //   current.forEach((opt) => (opt.selected = !allSelected));
  // }

  // resetAll() {
  //   this.options().forEach((opt) => (opt.selected = false));
  // }

  // submit() {
  //   const selected = this.options().filter((opt) => opt.selected);
  //   this.selectedValues.emit(selected);
  //   this.isOpen.set(false)
  //   // this.isVisible.set(false);
  // }

  // constructor(private elementRef: ElementRef) {}

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent) {
  //   if (!this.elementRef.nativeElement.contains(event.target)) {
  //     this.isOpen.set(false);
  //   }
  // }

  /** Optional ID for debugging / parent mapping */
  id = input<string>('');
  label= input<string>('')

  options = input<MultiSelectOption[]>([]);
  placeholder = input('Select');

  /** 🔥 INSTANCE-SCOPED STATE */
  private selectedValues = signal<Set<string>>(new Set());

  isOpen = signal(false);
  search = signal('');

  done = output<{ id: string; values: string[] }>();

  filteredOptions = computed(() =>
    this.options().filter((o) => o.label.toLowerCase().includes(this.search().toLowerCase())),
  );

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  toggleOption(value: string) {
    const next = new Set(this.selectedValues());
    next.has(value) ? next.delete(value) : next.add(value);
    this.selectedValues.set(next);
  }

  isChecked(value: string): boolean {
    return this.selectedValues().has(value);
  }

  selectAll() {
    this.selectedValues.set(new Set(this.options().map((o) => o.value)));
  }

  clearAll() {
    this.selectedValues.set(new Set());
  }

  doneSelection() {
    this.done.emit({
      id: this.id(),
      values: [...this.selectedValues()],
    });
    this.isOpen.set(false);
  }

  selectedLabel = computed(() => {
    if (!this.selectedValues().size) return this.placeholder();

    return this.options()
      .filter((o) => this.selectedValues().has(o.value))
      .map((o) => o.label)
      .join(', ');
  });
}
