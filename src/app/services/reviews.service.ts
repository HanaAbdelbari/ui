import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reviewsservice {
  id?: string;
  clientId: string;
  reviewType: string;
  serviceId: string;
  title: string;
  name: string;
  comment: string;
  rating: number;
  date: string;
  avatar?: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private apiUrl = '/api/reviews';

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Reviewsservice[]> {
    return this.http.get<Reviewsservice[]>(this.apiUrl);
  }

  createReview(review: Reviewsservice): Observable<Reviewsservice> {
    return this.http.post<Reviewsservice>(this.apiUrl, review);
  }

  getAverageRating(reviews: Reviewsservice[]): number {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length ? totalRating / reviews.length : 0;
  }

  getRatingDistribution(reviews: Reviewsservice[]): { [key: string]: number } {
    const distribution: { [key: string]: number } = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
    reviews.forEach(review => {
      const rating = review.rating.toString();
      distribution[rating] = (distribution[rating] || 0) + 1;
    });
    return distribution;
  }
}
