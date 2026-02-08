import { Component, computed, input, output, signal } from '@angular/core';
import { SelectItem } from '../select.types';
import { CityItem, CountryItem } from '../../../../b2b-dashboard/b2b-dashboard';

@Component({
  selector: 'app-single-select',
  imports: [],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.css',
})
export class SingleSelectComponent {
  items = input<CountryItem[]>([]);
  placeholder = input<string>('Select option');

  selectChange = output<CityItem>();
  label = input<string>('');

  isOpen = signal(false);
  searchTerm = signal('');
  selectedItem = signal<CityItem | null>(null);

  // Track open countries
  openCountries = signal<Set<string>>(new Set());

  toggleCountry(country: string): void {
    this.openCountries.update((set) => {
      const next = new Set(set);
      next.has(country) ? next.delete(country) : next.add(country);
      return next;
    });
  }

  filteredItems = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.items()
      .map((c) => ({
        ...c,
        cities: c.cities.filter((city) => city.label.toLowerCase().includes(term)),
      }))
      .filter((c) => c.cities.length > 0);
  });

  displayLabel = computed(() => {
    if (this.selectedItem()) return this.selectedItem()!.label;
    return this.placeholder();
  });

  toggle(): void {
    this.isOpen.update((v) => !v);
    this.searchTerm.set('');
  }

  select(item: SelectItem<number>): void {
    this.selectedItem.set(item);
    this.selectChange.emit(item);
    this.isOpen.set(false);
  }
}
