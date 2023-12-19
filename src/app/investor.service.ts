// src/app/investor.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';


interface ApiResponse {
  meta: {
    total: number;
    returned: number;
    page: number;
  };
  data: Investor[];
}

// Investor interface
interface Investor {
  firmID: string;
  firmName: string;
  // Add other properties as needed
}

@Injectable({
  providedIn: 'root'
})

export class InvestorService {
  private apiUrl = 'https://api.preqin.com';

  private username = 'dummydatafeeds@preqin.com';

  private api_key = '8f0bc69bc2a643f8bb8034a15081962e';

  constructor(private http: HttpClient) { }

  getAccessToken(): Observable<any> {
    const body = `username=${encodeURIComponent(this.username)}&apikey=${encodeURIComponent(this.api_key)}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}/connect/token`, body, { headers });
  }

  getInvestors(firmIds: number[]): Observable<any[]> {
    const firmIdString = firmIds.join(',');

    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<ApiResponse>(`${this.apiUrl}/api/Investor?firmId=${firmIdString}`, { headers }).pipe(
      map(response => response.data)
    );
  }

  getInvestorCommitment(assetClass: string, investorId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/api/Investor/commitment/${assetClass}/${investorId}`, { headers }).pipe(
      map(response => response.data)
    );
  }
}
