import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewListComponent } from './review-list.component';
import { ReviewsService } from 'src/app/services/reviews-client';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReviewListComponent', () => {
  let component: ReviewListComponent;
  let fixture: ComponentFixture<ReviewListComponent>;
  let mockReviewsService: jasmine.SpyObj<ReviewsService>;

  beforeEach(async () => {
    mockReviewsService = jasmine.createSpyObj('ReviewsService', ['getReviews']); // ✅ Corrected method name

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        NoopAnimationsModule // ✅ Fixes Angular Material issues
      ],
      declarations: [ReviewListComponent],
      providers: [
        { provide: ReviewsService, useValue: mockReviewsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadReviews on init', () => {
    mockReviewsService.getReviews.and.returnValue(of([])); // ✅ Corrected method name
    fixture.detectChanges();
    expect(mockReviewsService.getReviews).toHaveBeenCalled(); // ✅ Corrected method name
  });

  it('should apply filters and reload reviews', () => {
    spyOn(component, 'loadReviews');
    component.applyFilters();
    expect(component.loadReviews).toHaveBeenCalled();
  });
});
