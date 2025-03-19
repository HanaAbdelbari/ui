import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReviewsService, Reviewsservice } from 'src/app/services/reviews.service';
import { HttpClientModule } from '@angular/common/http';
import { RatingSummaryComponent } from '../rating-summary/rating-summary.component';
import {Reviewcomponent} from '../../app.component';

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
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  @Input({ transform: (value: Reviewcomponent[]): Reviewsservice[] => value as Reviewsservice[] })
  reviews: Reviewsservice[] = [];
  overallRating: number = 0;
  totalReviews: number = 0;
  averageRating: number = 0;
  ratingDistribution: { [key: string]: number } = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0};

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    if (this.reviews.length === 0) {
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

      // If no reviews are fetched, add example reviews
      if (this.reviews.length === 0) {
        this.addExampleReviews();
      }
    }, error => {
      console.error("Failed to load reviews:", error);
      // If an error occurs, still add example reviews
      if (this.reviews.length === 0) {
        this.addExampleReviews();
      }
    });
  }

  // Method to add fake reviews if none exist
  private addExampleReviews(): void {
    this.reviews = [
      {
        clientId: '12345', // Example client ID
        reviewType: 'package', // Example review type
        serviceId: '67890', // Example service ID
        avatar: 'https://via.placeholder.com/50',
        title: 'Amazing Package!',
        name: 'John Doe',
        rating: 5,
        comment: 'Everything was perfect, highly recommend!',
        date: 'March 18, 2025',
      },
      {
        clientId: '22345',
        reviewType: 'package',
        serviceId: '77890',
        avatar: 'https://via.placeholder.com/50',
        title: 'Good but expensive',
        name: 'Jane Smith',
        rating: 4,
        comment: 'Great experience but a bit overpriced.',
        date: 'March 16, 2025',
      },
      {
        clientId: '32345',
        reviewType: 'package',
        serviceId: '87890',
        avatar: 'https://via.placeholder.com/50',
        title: 'Not what I expected',
        name: 'Ali Ahmed',
        rating: 2,
        comment: 'The service was slow and not up to the mark.',
        date: 'March 14, 2025',
      }
    ];
    this.calculateOverallRating();
  }


  getRatingPercentage(rate: number): number {
    if (this.totalReviews === 0) return 0;
    const count = this.reviews.filter(review => review.rating === rate).length;
    return (count / this.totalReviews) * 100;
  }

  @Output() reviewAdded = new EventEmitter<Reviewsservice>();
  addNewReview(newReview: Reviewsservice): void {
    this.reviews.unshift(newReview);
    this.calculateOverallRating();
  }

  calculateOverallRating(): void {
    if (this.reviews.length > 0) {
      const total = this.reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
      this.overallRating = total / this.reviews.length;
      this.averageRating = parseFloat(this.overallRating.toFixed(1));
      this.totalReviews = this.reviews.length;
    } else {
      this.overallRating = 0;
      this.averageRating = 0;
      this.totalReviews = 0;
    }
  }

  applyFilters() {}
}
