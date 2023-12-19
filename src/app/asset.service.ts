import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private assetClasses: string[] = ['PE', 'PD', 'RE', 'INF', 'NR', 'HF'];

  constructor() { }

  getAssets(): string[] {
    return this.assetClasses;
  }
}
