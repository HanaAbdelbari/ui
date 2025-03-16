import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Configuration class for API base path
export class Configuration {
  constructor(public basePath: string) {}
}

// Define the structure of a review
export interface Review {
  id: string;
  serviceId: string;
  clientId: string;
  reviewType: string;
  comment: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: Configuration) {
    this.apiUrl = `${this.config.basePath}/reviews`;
  }

  // Fetch all reviews with optional filters
  getReviews(filters: Partial<Review> = {}): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl, { params: filters as any });
  }

  // Get a single review by ID
  getReviewById(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  // Create a new review
  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  // Update an existing review
  updateReview(review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${review.id}`, review);
  }

  // Delete a review
  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
