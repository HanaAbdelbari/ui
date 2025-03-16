import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReviewsService, Review } from '../../services/reviews.service';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatSlider
  ],
  providers: [ReviewsService],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})

export class ReviewFormComponent {
  reviewForm: FormGroup;

  @Output() reviewAdded = new EventEmitter<Review>();

  constructor(private fb: FormBuilder, private reviewsService: ReviewsService) {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      comment: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const newReview: Review = this.reviewForm.value;
      this.reviewsService.createReview(newReview).subscribe(() => {
        this.reviewForm.reset({ rating: 5 });
        this.reviewAdded.emit(newReview);
      });
    }
  }
}
