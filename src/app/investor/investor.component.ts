import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestorService } from '../investor.service';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent implements OnInit {
  investorId!: number; // Use definite assignment assertion
  assetClasses: string[] = [];
  selectedAssetClass!: string; // Use definite assignment assertion
  commitmentData: any;

  constructor(
    private route: ActivatedRoute,
    private investorService: InvestorService,
    private assetService: AssetService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.investorId = +params['id'];
      this.loadCommitmentData();
    });

    this.assetClasses = this.assetService.getAssets();
  }

  loadCommitmentData() {
    if (this.selectedAssetClass) {
      this.investorService.getInvestorCommitment(this.selectedAssetClass, this.investorId).subscribe(
        data => this.commitmentData = data,
        error => {
          console.error('Error fetching commitment data:', error);
        }
      );
    }
  }
}
