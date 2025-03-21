import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReviewsService, Reviewsservice } from '../../services/reviews.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSliderModule
  ],
  providers: [ReviewsService],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {
  reviewForm: FormGroup;

  @Output() reviewAdded = new EventEmitter<Reviewsservice>();

  constructor(private fb: FormBuilder, private reviewsService: ReviewsService) {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      comment: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  get ratingControl(): FormControl {
    return this.reviewForm.get('rating') as FormControl;
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      // Ensure required properties exist
      const newReview: Reviewsservice = {
        clientId: 'temp-id', // Replace with actual client ID logic
        reviewType: 'package', // Example type
        serviceId: 'temp-service', // Replace with actual service logic
        ...this.reviewForm.value
      };

      this.reviewsService.createReview(newReview).subscribe(() => {
        this.reviewForm.reset({ rating: 5 }, { emitEvent: false }); // Prevent validation issues
        this.reviewAdded.emit(newReview);
      });
    }
  }
}
