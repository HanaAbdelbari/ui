import { Component, Input } from '@angular/core';
import {DecimalPipe, NgForOf} from '@angular/common';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-summary',
  templateUrl: './rating-summary.component.html',
  imports: [
    DecimalPipe,
    MatIconModule,
    NgForOf,
    CommonModule,
    MatIcon
  ],
  styleUrls: ['./rating-summary.component.scss']
})
export class RatingSummaryComponent {
  @Input() overallRating: number = 4.9;
  @Input() totalReviews: number = 0;
  @Input() ratingDistribution: { [key: string]: number } = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };

  getDistributionArray(): { stars: number, count: number }[] {
    return Object.keys(this.ratingDistribution).map(stars => ({
      stars: parseInt(stars, 10),
      count: this.ratingDistribution[stars]
    }));
  }
}
