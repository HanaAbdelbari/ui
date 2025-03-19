import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Configuration class for API base path
export class Configuration {
  constructor(public basePath: string) {}
}

// Define the structure of a review
export interface Reviewclient {
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
  getReviews(filters: Partial<Reviewclient> = {}): Observable<Reviewclient[]> {
    return this.http.get<Reviewclient[]>(this.apiUrl, { params: filters as any });
  }

  // Get a single review by ID
  getReviewById(id: string): Observable<Reviewclient> {
    return this.http.get<Reviewclient>(`${this.apiUrl}/${id}`);
  }

  // Create a new review
  createReview(review: Reviewclient): Observable<Reviewclient> {
    return this.http.post<Reviewclient>(this.apiUrl, review);
  }

  // Update an existing review
  updateReview(review: Reviewclient): Observable<Reviewclient> {
    return this.http.put<Reviewclient>(`${this.apiUrl}/${review.id}`, review);
  }

  // Delete a review
  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
