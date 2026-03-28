import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SearchApi {
  private http = inject(HttpClient);

  private baseUrl = 'http://127.0.0.1:3658/m1/1229017-1225299-default';

  search(payload: any) {
    return this.http.post(`${this.baseUrl}/get-yachtoperationsearch`, payload);
  }
}
