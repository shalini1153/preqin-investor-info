import { Observable, of } from 'rxjs';

export class MockInvestorService {
  getAccessToken(): Observable<any> {
    return of({ access_token: 'mock_access_token' });
  }

  getInvestors(firmIds: number[]): Observable<any[]> {
    // Provide a mock response for getInvestors
    return of([
      { firmID: 2670, firmName: 'Investor 1', /* other properties */ },
      { firmID: 2792, firmName: 'Investor 2', /* other properties */ },
    ]);
  }
}
