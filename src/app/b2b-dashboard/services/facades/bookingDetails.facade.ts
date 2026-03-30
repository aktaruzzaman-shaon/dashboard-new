import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, Observable, of, tap } from 'rxjs';
import { BookingDetails } from '../api/bookingDeatails.api';
import { RemarkBody } from '../types/type';

type Booking = {
  bookingId: number;
  remark: string;
  userId: string;
};

@Injectable({ providedIn: 'root' })
export class BookingDetailsFacade {
  private api = inject(BookingDetails);

  constructor() {
    effect(() => {
      // console.log('log details', this.logDetails());
      console.log('booking details', this.bookingDetails());
      // console.log('remarks details', this.remarks());
    });
  }

  private bookingId = signal<number | string | any>(null);
  private remarksId = signal<number | string | any>(null);
  private bookingDetailsId = signal<number | string | any>(null);
  private reamarkBody = signal<RemarkBody>({
    bookingId: 0,
    remark: '',
    userId: '',
  });

  private extractArray(val: any): any[] {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (Array.isArray(val.data)) {
      // console.log("inside extract array",Array.isArray(val.data[0]) ? val.data[0] : val.data)
      return Array.isArray(val.data[0]) ? val.data[0] : val.data;
    }
    return [];
  }

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

  private logsResource = rxResource<any, number | string | null>({
    params: () => this.bookingId(),
    stream: ({ params }) => {
      if (!params) return of(null);

      return this.api.logDetails(params).pipe(
        // tap({
        //   next: (res) => console.log('API SUCCESS:', res),
        //   error: (err) => console.log('API ERROR BEFORE CATCH:', err),
        // }),
        catchError((err) => {
          return of([]);
        }),
      );
    },
  });

  private remarksResource = rxResource<any, number | string | null>({
    params: () => this.remarksId(),
    stream: ({ params }) => {
      if (!params) return of(null);

      return this.api.remarks(params).pipe(
        tap({
          next: (res) => console.log('API SUCCESS:', res),
          error: (err) => console.log('API ERROR BEFORE CATCH:', err),
        }),
        catchError((err) => {
          return of([]);
        }),
      );
    },
  });

  private bookingDetailsResource = rxResource<any, number | string | null>({
    params: () => this.bookingDetailsId(),
    stream: ({ params }) => {
      if (!params) return of(null);

      return this.api.bookingDetails(params).pipe(
        // tap({
        //   next: (res) => console.log('API SUCCESS:', res),
        //   error: (err) => console.log('API ERROR BEFORE CATCH:', err),
        // }),
        catchError((err) => {
          return of(null);
        }),
      );
    },
  });

  private submitRemarkResource = this.createResource(
    () => this.reamarkBody(),
    (params) => this.api.submitRemark(params),
    [],
  );

  loading = this.logsResource.isLoading;
  error = this.logsResource.error;

  logDetails = computed(() => {
    // console.log('logs', this.extractArray(this.logsResource.value()));
    return this.extractArray(this.logsResource.value());
  });

  remarks = computed(() => {
    return this.remarksResource.value()?.data ?? null;
  });

  // bookingDetails = computed(() => {
  //   // console.log('booking details in computed', this.bookingDetailsResource.value());
  //   return this.extractArray(this.bookingDetailsResource.value());
  // });

  bookingDetails = computed(() => {
    const data = this.extractArray(this.bookingDetailsResource.value());
    return data.length ? data[0] : null;
  });

  loadLogs(bookingId: any) {
    const bookingIdBody = { bookingId: bookingId };
    this.bookingId.set(bookingIdBody);
  }

  loadRemarks(bookingId: any) {
    const remarksIdBody = { bookingId: bookingId };
    this.remarksId.set(remarksIdBody);
  }

  loadBookingDetails(bookingId: any) {
    const bookingDetailsIdBody = { bookingId: bookingId };
    this.bookingDetailsId.set(bookingDetailsIdBody);
  }

  submitRemark(remark: RemarkBody) {
    this.reamarkBody.set(remark);
  }
}
