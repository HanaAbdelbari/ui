import { Component, Input } from '@angular/core';
import { DecimalPipe, NgForOf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-rating-summary',
  templateUrl: './rating-summary.component.html',
  imports: [
    DecimalPipe,
    MatIconModule,
    NgForOf,
    CommonModule,
    MatProgressBarModule
  ],
  styleUrls: ['./rating-summary.component.scss']
})
export class RatingSummaryComponent {
  @Input() overallRating: number = 0;
  @Input() totalReviews: number = 0;
  @Input() ratingDistribution: { [key: string]: number } = { '1': 3, '2': 1, '3': 4, '4': 5, '5': 2 };

  ngOnChanges(): void {
    this.calculateOverallRating();
  }

  calculateOverallRating(): void {
    const totalRatings = Object.entries(this.ratingDistribution)
      .reduce((sum, [stars, count]) => sum + Number(stars) * count, 0);

    this.totalReviews = Object.values(this.ratingDistribution).reduce((sum, count) => sum + count, 0);
    this.overallRating = this.totalReviews > 0 ? totalRatings / this.totalReviews : 0;
  }

  getRatingPercentage(rate: number): number {
    if (this.totalReviews === 0) return 0;
    return (this.ratingDistribution[rate] / this.totalReviews) * 100;
  }

  getDistributionArray(): { stars: number, count: number }[] {
    return Object.keys(this.ratingDistribution)
      .map(stars => ({
        stars: parseInt(stars, 10),
        count: this.ratingDistribution[stars]
      }))
      .sort((a, b) => b.stars - a.stars);
  }

  protected readonly Math = Math;
}
