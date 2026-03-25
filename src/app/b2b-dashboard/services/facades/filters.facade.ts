import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { forkJoin, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DatePayload, FiltersApi } from '../api/filters.api';

export interface City {
  cityId: number;
  cityName: string;
}

// 1. Flexible Response Interface
// We type 'cities' because we know it, but use 'any' for others to allow any pattern
export interface FiltersResponse {
  cities: { data: City[]; timestamp: string } | any;
  optionNames: any; 
  suppliers: any;
  users: any;
  profitCenters: any;
  providers: any;
}

@Injectable({ providedIn: 'root' })
export class FiltersFacade {
  private api = inject(FiltersApi);
  private payload = signal<DatePayload | null>(null);
  constructor() {
    // Optional: Log when filters are loaded for debugging
    effect(() => {
      console.log('Filters loaded:', this.filtersResource.value());
      console.log('Cities:', this.cities());
      console.log('Option Names:', this.optionNames());
      console.log('Suppliers:', this.suppliers());
      console.log('Users:', this.users());
      console.log('Profit Centers:', this.profitCenters());
      console.log('Providers:', this.providers());
    });
  }

  private filtersResource = rxResource<FiltersResponse | null, DatePayload | null>({
    params: () => this.payload(),
    stream: ({ params: payload }) => {
      // Handle the null case explicitly to satisfy the 'Observable<FiltersResponse | null>' return type
      if (!payload) return of(null);

      return forkJoin({
        // Fix: catchError MUST return the same structure as the success stream
        cities: this.api.getCities(payload).pipe(
          catchError(() => of({ data: [], timestamp: '' }))
        ),
        // For 'any' types, returning [] is safe
        optionNames: this.api.getOptionNames(payload).pipe(catchError(() => of([]))),
        suppliers: this.api.getSuppliers(payload).pipe(catchError(() => of([]))),
        users: this.api.getUsers(payload).pipe(catchError(() => of([]))),
        profitCenters: this.api.getProfitCenters(payload).pipe(catchError(() => of([]))),
        providers: this.api.getProviders(payload).pipe(catchError(() => of([]))),
      });
    }
  });

  // This ensures that whether the API returns [item] or { data: [item] }, you get an array.
  private extractArray(val: any): any[] {
    if (!val) return [];
    return Array.isArray(val) ? val : (val.data ?? []);
  }

  // 4. State Signals
  loading = this.filtersResource.isLoading;
  
  // Specific extraction for cities since we know its shape
  cities = computed(() => this.filtersResource.value()?.cities?.data ?? []);

  // Generic extraction for others to prevent "any pattern" issues
  optionNames = computed(() => this.extractArray(this.filtersResource.value()?.optionNames));
  suppliers = computed(() => this.extractArray(this.filtersResource.value()?.suppliers));
  users = computed(() => this.extractArray(this.filtersResource.value()?.users));
  profitCenters = computed(() => this.extractArray(this.filtersResource.value()?.profitCenters));
  providers = computed(() => this.extractArray(this.filtersResource.value()?.providers));

  loadFilters(payload: DatePayload) {
    this.payload.set(payload);
  }

  reset() {
    this.payload.set(null);
  }
}