import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { PracticePage } from './features/practice/practice';

// The five algorithm routes now share one component and route by id
// instead of pointing at five separate demo components — this also
// matches the /algorithms/:id path used in the rest of the project's
// planning documents. Learn and Test will sit under the same :id param
// once those pages exist; only the segment after the id changes.
export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'algorithms/:id',
    component: PracticePage,
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
