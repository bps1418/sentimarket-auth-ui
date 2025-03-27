import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  positions: any[] = [];
  loading = true;
  error = '';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPositions().subscribe({
      next: (data) => {
        this.positions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load positions';
        this.loading = false;
      }
    });
  }
}