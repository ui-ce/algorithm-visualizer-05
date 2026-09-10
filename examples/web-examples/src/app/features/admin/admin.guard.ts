import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router, type CanActivateFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

// Waits for AuthService's initial session check to finish (isInitializing
// goes false) before deciding, so a page refresh on /admin/questions
// doesn't briefly bounce an actual admin back out before their session
// has even been read from storage. See AuthService.isInitializing.
export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await firstValueFrom(
    toObservable(authService.isInitializing).pipe(
      filter((initializing) => !initializing),
      take(1),
    ),
  );

  if (authService.currentUser()?.isAdmin) {
    return true;
  }

  return router.createUrlTree(['/login']);
};