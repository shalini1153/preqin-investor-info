import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { InvestorService } from '../investor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  firmIds = [2670, 2792, 332, 3611];
  investors: any[] = [];

  constructor(
    private investorService: InvestorService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getHeaders();
  }

  getHeaders() {
    this.investorService.getAccessToken().subscribe(
      data => {
        // Store the access token in localStorage
        localStorage.setItem('access_token', data.access_token);
        this.loadInvestors();
      },
      error => console.error('Error fetching Token:', error)
    );
  }

  loadInvestors() {
    this.investorService.getInvestors(this.firmIds).subscribe(
      data => this.investors = data,
      error => console.error('Error fetching investors:', error)
    );
  }

  navigateToInvestorPage(investorId: string) {
    this.router.navigate(['/investors', investorId]);
  }


}
