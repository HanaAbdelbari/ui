import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { Configuration, ReviewsService } from './app/services/reviews-client';




// Function to provide API configuration
export function apiConfigFactory(): Configuration {
  return new Configuration(
    'http://localhost:5050', // Ensure the protocol is included
  );
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),      // Provides HttpClient globally
    provideRouter(routes),    // Provides routing configuration
    provideAnimations(),      // Ensures animations work
    { provide: Configuration, useFactory: apiConfigFactory }, // API config
    ReviewsService,           // Service for handling reviews
  ],
}).catch((err) => console.error('Error bootstrapping application:', err));
