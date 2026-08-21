import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Home } from './components/home/home';
import { PracticePage } from './features/practice/practice';
import { TestPlan } from './features/test/pages/test-plan/test-plan';
import { Test } from './features/test/test';
import { TestResults } from './features/test/pages/test-results/test-results';
import { LoginPage } from './features/auth/login/login';
import { RegisterPage } from './features/auth/register/register';


// '' is the Landing page (hero, algorithm picker, features, product
// tour, quiz spotlight, comparison, sign-up, footer) — the entry point
// for the app. '/home' (the original card-grid page) is left in place
// since the landing page's "view all algorithms" button and footer
// links still point at it.
//
// '/login' and '/register' were added here because both already exist
// as components (features/auth) and are now linked from real UI:
// the header's account icon already pointed at '/login' before this
// change, and the landing page's new sign-up section links to both.
//
// The five algorithm routes now share one component and route by id
// instead of pointing at five separate demo components — this also
// matches the /algorithms/:id path used in the rest of the project's
// planning documents. Learn will sit under the same :id param once that
// page exists; only the segment after the id changes.
//
// Test is three routes: /test is the level/set picker (TestPlan — the
// "Choose your test plan" screen); /test/:difficulty/:set is the actual
// question-answering screen (Test); /test/:difficulty/:set/results is the
// pass/fail summary screen (TestResults), reached only via Test's
// "Finish Test" navigation since it needs router state that a typed URL
// won't have (TestResults redirects back to TestPlan if that state is
// missing — see its constructor).
export const routes: Routes = [
  {
    path: '',
    component: Landing,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'algorithms/:id',
    component: PracticePage,
  },
  {
    path: 'algorithms/:id/test',
    component: TestPlan,
  },
  {
    path: 'algorithms/:id/test/:difficulty/:set/results',
    component: TestResults,
  },
  {
    path: 'algorithms/:id/test/:difficulty/:set',
    component: Test,
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
