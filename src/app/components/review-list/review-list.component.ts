import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReviewsService, Review } from 'src/app/services/reviews.service'; // ✅ Keep only this import
import { HttpClientModule } from '@angular/common/http';
import { RatingSummaryComponent } from '../rating-summary/rating-summary.component';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    RatingSummaryComponent
  ],
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() reviews: Review[] = []; // ✅ Ensure reviews can be passed from parent
  overallRating: number = 0;
  totalReviews: number = 0;
  averageRating: number = 0;
  private filters: any;
  ratingDistribution: { [key: string]: number } = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    if (this.reviews.length === 0) { // ✅ Only fetch if no reviews are passed
      this.loadReviews();
    } else {
      this.calculateOverallRating();
    }
  }

  loadReviews(): void {
    this.reviewsService.getReviews().subscribe(reviews => {
      this.reviews = reviews;
      this.overallRating = this.reviewsService.getAverageRating(reviews);
      this.ratingDistribution = this.reviewsService.getRatingDistribution(reviews);
      this.calculateOverallRating();
    });
  }
  // Add the applyFilters method
  applyFilters(filters: any = {}): void {
    this.filters = filters; // Update the filters
    this.loadReviews(); // Reload reviews with the new filters
  }

  calculateOverallRating(): void {
    if (this.reviews.length > 0) {
      const total = this.reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
      this.overallRating = total / this.reviews.length;
      this.averageRating = parseFloat(this.overallRating.toFixed(1)); // ✅ Rounded for UI
      this.totalReviews = this.reviews.length;
    } else {
      this.overallRating = 0;
      this.averageRating = 0;
      this.totalReviews = 0;
    }
  }

  getRatingPercentage(rate: number): number {
    if (this.totalReviews === 0) return 0;
    const count = this.reviews.filter(review => review.rating === rate).length;
    return (count / this.totalReviews) * 100;
  }

  // ✅ Ensure new reviews update the list
  @Output() reviewAdded = new EventEmitter<Review>();
  addNewReview(newReview: Review): void {
    this.reviews.unshift(newReview); // Adds new review at the start
    this.calculateOverallRating();
  }
}
