import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { SearchApi } from '../api/search.api';
import { availableDates } from '../mappers/booking.mapper';

@Injectable({ providedIn: 'root' })
export class SearchFacade {
  private api = inject(SearchApi);

  constructor() {
    effect(() => {
      const data = this.results();
      const dates = availableDates(data);
      this.allotedDates.set(dates);
    });
  }

  private payload = signal<any | null>(null);
  allotedDates = signal<string[]>([]);

  private searchResource = rxResource<any, any>({
    params: () => this.payload(),
    stream: ({ params }) => {
      if (!params) return of(null);

      return this.api.search(params).pipe(
        catchError((err) => {
          console.error('Search API Error:', err);
          return of([]);
        }),
      );
    },
  });

  private extractArray(val: any): any[] {
    if (!val) return [];
    return Array.isArray(val) ? val : (val.data ?? []);
  }

  results = computed(() => {
    console.log('facade booking data', this.searchResource.value()?.data);
    return this.searchResource.value()?.data ?? [];
  });
  loading = this.searchResource.isLoading;
  error = this.searchResource.error;

  search(payload: any) {
    this.payload.set(payload);
  }

  reset() {
    this.payload.set(null);
  }
}
