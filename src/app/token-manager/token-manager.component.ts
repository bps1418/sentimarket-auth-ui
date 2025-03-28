import { Component } from '@angular/core';
import { TokenManagerService } from './token-manager.service';

@Component({
  selector: 'app-token-manager',
  templateUrl: './token-manager.component.html',
  styleUrls: ['./token-manager.component.css']
})
export class TokenManagerComponent {
  jwtToken = '';
  statusMessage = '';

  constructor(private tokenService: TokenManagerService) {}

  saveToken(): void {
    if (!this.jwtToken.trim()) {
      this.statusMessage = 'Token cannot be empty.';
      return;
    }

    localStorage.setItem('robinhood_jwt', this.jwtToken);
    this.statusMessage = 'Token saved successfully!';
  }

  loadToken(): void {
    const stored = localStorage.getItem('robinhood_jwt');
    if (stored) {
      this.jwtToken = stored;
      this.statusMessage = 'Loaded saved token.';
    }
  }

  downloadPositions(): void {
    if (!this.jwtToken.trim()) {
      this.statusMessage = 'Token is missing.';
      return;
    }

    this.tokenService.triggerDownload(this.jwtToken).subscribe({
      next: () => {
        this.statusMessage = '✅ Download request sent successfully.';
      },
      error: (err) => {
        this.statusMessage = `❌ Failed to trigger download: ${err.error?.message || err.statusText}`;
      }
    });
  }

  ngOnInit(): void {
    this.loadToken();
  }
}