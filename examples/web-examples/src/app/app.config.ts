import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import aura from '@primeuix/themes/aura';
import { initDynamicQuestionBank } from './features/test/data/test-question-bank';
import { initDynamicAlgorithmContent } from './features/practice/data/algorithm-content.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: aura
      }
    }),
    // Swaps DFS/Dijkstra's static question data for whatever's actually
    // in the database (see docs/database/schema-questions.sql and
    // features/test/data/test-question-bank.ts's DYNAMIC_ALGORITHM_IDS)
    // before any component gets a chance to read the bank. Never blocks
    // app start on failure — initDynamicQuestionBank swallows fetch
    // errors and just leaves the existing static data in place.
    {
      provide: APP_INITIALIZER,
      useFactory: () => initDynamicQuestionBank,
      multi: true,
    },
     // Same idea for Learn/Practice's algorithm content — see
    // docs/database/schema-content.sql and
    // features/practice/data/algorithm-content.loader.ts's
    // DYNAMIC_CONTENT_ALGORITHM_IDS. Runs in parallel with the
    // question-bank initializer above (Angular fires every multi
    // APP_INITIALIZER concurrently), so this adds no extra startup delay.
    {
      provide: APP_INITIALIZER,
      useFactory: () => initDynamicAlgorithmContent,
      multi: true,
    },
  ]
};