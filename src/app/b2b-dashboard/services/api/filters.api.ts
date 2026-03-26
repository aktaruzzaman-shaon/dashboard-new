import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../types/b2b-dashboard.types';

export interface DatePayload {
  fromDate: string;
  toDate: string;
}

@Injectable({ providedIn: 'root' })
export class FiltersApi {
  private http = inject(HttpClient);

  private baseUrl = 'http://127.0.0.1:3658/m1/1229017-1225299-default';

  // ✅ Countries
  getCountries(payload: DatePayload): Observable<Country[]> {
    return this.http.post<Country[]>(
      `${this.baseUrl}/get-yachtoperationcountry`,
      payload
    );
  }
  
  //cities
    getCities(payload: DatePayload): Observable<string[]> {
    return this.http.post<string[]>(
      `${this.baseUrl}/get-yachtoperationcity`,
      payload
    );
  }


  // ✅ Option Names
  getOptionNames(payload: DatePayload): Observable<string[]> {
    return this.http.post<string[]>(
      `${this.baseUrl}/get-yachtoperationoptionname`,
      payload
    );
  }

  // ✅ Suppliers
  getSuppliers(payload: DatePayload): Observable<string[]> {
    return this.http.post<string[]>(
      `${this.baseUrl}/get-yachtoperationsupplierdetail`,
      payload
    );
  }

  // ✅ Users
  getUsers(payload: DatePayload): Observable<string[]> {
    return this.http.post<string[]>(
      `${this.baseUrl}/get-yachtoperationusername`,
      payload
    );
  }

  // ✅ Profit Centers
  getProfitCenters(payload: DatePayload): Observable<string[]> {
    return this.http.post<string[]>(
      `${this.baseUrl}/get-yachtoperationprofitcentername`,
      payload
    );
  }

  // ✅ Providers
  getProviders(payload: DatePayload): Observable<string[]> {
    return this.http.post<string[]>(
      `${this.baseUrl}/get-yachtoperationprovidername`,
      payload
    );
  }
}