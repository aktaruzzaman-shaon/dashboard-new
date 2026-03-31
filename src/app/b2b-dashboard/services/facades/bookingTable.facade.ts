import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, Observable, of, tap } from 'rxjs';
import { BookingTableApi } from '../api/bookingTable.api';

@Injectable({ providedIn: 'root' })
export class BookingTableFacade {
  private api = inject(BookingTableApi);

  constructor() {
    effect(() => {});
  }

  private payload = signal<any | null>(null);
  private bookingColumnConfig = signal<any | null>(null);

  // generic helper resource
  createResource<T, P>(
    paramsSignal: () => P,
    apiCall: (params: P) => Observable<T>,
    defaultValue: T,
  ) {
    return rxResource<T, P>({
      params: paramsSignal,
      stream: ({ params }) => {
        if (!params) return of(defaultValue);

        return apiCall(params).pipe(
          tap({
            next: (res) => console.log('API SUCCESS:', res),
            error: (err) => console.log('API ERROR BEFORE CATCH:', err),
          }),
          catchError(() => of(defaultValue)),
        );
      },
    });
  }

  updateColumnConfig = this.createResource(
    () => this.bookingColumnConfig(),
    (payload) => this.api.bookingTableColumnConfig(payload),
    null,
  );

  private extractArray(val: any): any[] {
    if (!val) return [];
    return Array.isArray(val) ? val : (val.data ?? []);
  }

  saveColumnConfig(payload: any) {
    this.bookingColumnConfig.set(payload);
  }

  reset() {
    this.payload.set(null);
  }
}
