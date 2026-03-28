import { Injectable, inject, signal, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { SearchApi } from '../api/search.api';


@Injectable({ providedIn: 'root' })
export class SearchFacade {
  private api = inject(SearchApi);

  // 🔹 search payload signal
  private payload = signal<any | null>(null);

  // 🔹 search resource
  private searchResource = rxResource<any, any>({
    params: () => this.payload(),
    stream: ({ params }) => {
      if (!params) return of(null);

      return this.api.search(params).pipe(
        catchError((err) => {
          console.error('Search API Error:', err);
          return of([]);
        })
      );
    },
  });

  // 🔹 exposed signals
  results = computed(() => this.searchResource.value() ?? []);
  loading = this.searchResource.isLoading;
  error = this.searchResource.error;

  // 🔹 trigger search
  search(payload: any) {
    console.log('Search payload:', payload);
    this.payload.set(payload);
  }

  // 🔹 reset search
  reset() {
    this.payload.set(null);
  }
}