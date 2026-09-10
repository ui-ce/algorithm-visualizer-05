import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { PracticePage } from './features/practice/practice';
import { TestPlan } from './features/test/pages/test-plan/test-plan';
import { Test } from './features/test/test';
import { TestResults } from './features/test/pages/test-results/test-results';
import { LoginPage } from './features/auth/login/login';
import { RegisterPage } from './features/auth/register/register';
import { ComparePage } from './features/compare/comapre';
import { LearnPage } from './features/learn/learn';
import { CustomAlgorithmPage } from './features/custom-algorithm/custom-algorithm.page';
import { AdminShell } from './features/admin/admin-shell';
import { AdminQuestionsPage } from './features/admin/admin-questions';
import { AdminContentPage } from './features/admin/admin-content';
import { AdminTablesPage } from './features/admin/admin-tables';
import { AdminSqlPage } from './features/admin/admin-sql';
import { adminGuard } from './features/admin/admin.guard';


export const routes: Routes = [
  {
    path: '',
    component: Landing,
    pathMatch: 'full',
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
  // adminGuard on this parent route gates every child route below it
  // too — Angular re-checks canActivate for the whole matched chain on
  // every navigation, so there's no separate guard needed per section.
  {
    path: 'admin',
    component: AdminShell,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'questions', pathMatch: 'full' },
      { path: 'questions', component: AdminQuestionsPage },
      { path: 'content', component: AdminContentPage },
      { path: 'tables', component: AdminTablesPage },
      { path: 'sql', component: AdminSqlPage },
    ],
  },
  {
    path: 'custom-algorithm',
    component: CustomAlgorithmPage,
  },
  {
    path: 'algorithms/:id/learn',
    component: LearnPage,
  },
   {
    path: 'compare/:id',
    component: ComparePage,
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
    redirectTo: '/',
    pathMatch: 'full',
  },
];