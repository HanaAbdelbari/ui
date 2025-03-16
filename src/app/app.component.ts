import { Component } from '@angular/core';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { RatingSummaryComponent } from './components/rating-summary/rating-summary.component';

export interface Review {
  title: string;
  name: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReviewFormComponent,
    ReviewListComponent,
    RatingSummaryComponent,
    RouterOutlet,
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
      throw new Error('Method not implemented.');
  }
  reviews: Review[] = [];
  overallRating: number = 0;
  ratingDistribution: { [key: string]: number } = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };

  addReview(newReview: Review): void {
    this.reviews.push(newReview);
    this.overallRating = this.calculateOverallRating();
    this.ratingDistribution = this.calculateRatingDistribution();
  }

  calculateOverallRating(): number {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return this.reviews.length ? totalRating / this.reviews.length : 0;
  }

  calculateRatingDistribution(): { [key: string]: number } {
    const distribution: { [key: string]: number } = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
    this.reviews.forEach(review => {
      const rating = review.rating.toString();
      distribution[rating] = (distribution[rating] || 0) + 1;
    });
    return distribution;
  }

  protected readonly ReviewListComponent = ReviewListComponent;
}
