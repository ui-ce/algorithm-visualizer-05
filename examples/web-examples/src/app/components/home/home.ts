// import { Component } from '@angular/core';
// import { Button } from 'primeng/button';
// import { Card } from 'primeng/card';
// import { AlgorithmData } from './models/algorithm-data.type';
// import { Router } from '@angular/router';
// import { AlgoHeader } from '../../layout/header/header';
// import { ThemeService } from '../../core/services/theme.service';
// import { LanguageService } from '../../core/services/language.service';
// import { TranslatePipe } from '../../core/i18n/translate.pipe';

// // Route values below now point at /algorithms/:id instead of a flat
// // path per algorithm, matching the routing change in app.routes.ts.
// // This page's own layout (card grid) is a placeholder from before the
// // redesign and is expected to be replaced by the real Landing Page —
// // only the destination each card navigates to changed here, not this
// // page's own design.
// @Component({
//   selector: 'algo-home',
//   imports: [Button, Card, AlgoHeader],
//   templateUrl: './home.html',
//   styleUrl: './home.scss',
// })
// export class Home {
//   protected readonly algorithmData: AlgorithmData[] = [
//     {
//       name: 'Merge Sort',
//       class: 'Sorting',
//       description:
//         'A divide-and-conquer sorting algorithm that divides the array into halves, sorts them recursively, and then merges the sorted halves.',
//       imgUrl: 'merge-sort.jpg',
//       route: 'algorithms/merge-sort',
//     },
//     {
//       name: 'Bubble Sort',
//       class: 'Sorting',
//       description:
//         'A simple comparison-based sorting algorithm where each pair of adjacent elements is compared and swapped if they are in the wrong order.',
//       imgUrl: 'bubble-sort.jpg',
//       route: 'algorithms/bubble-sort',
//     },
//     {
//       name: 'Binary Search',
//       class: 'Searching',
//       description:
//         'An efficient algorithm for finding a target value within a sorted array by repeatedly dividing the search interval in half.',
//       imgUrl: 'binary-search.jpg',
//       route: 'algorithms/binary-search',
//     },
//     {
//      name: 'Linear Search',
//      class: 'Searching',
//      description:
//      'A simple search algorithm that checks each element one by one until the target value is found or the entire array has  been searched.',
//       imgUrl: 'linear-search.jpg',
//       route: 'algorithms/linear-search',
//     },
//      {
//       name: 'Quick Sort',
//       class: 'Sorting',
//       description:
//         'A divide-and-conquer sorting algorithm that partitions the array around a pivot so smaller values end up on its left and larger values on its right, then recursively sorts each side.',
//       imgUrl: 'quick-sort.jpg',
//       route: 'algorithms/quick-sort',
//     },
//     {
//       name: 'Selection Sort',
//       class: 'Sorting',
//       description:
//         'A sorting algorithm that repeatedly scans the unsorted part of the array for its smallest value and swaps it into place at the front of that region.',
//       imgUrl: 'selection-sort.jpg',
//       route: 'algorithms/selection-sort',
//     },
//     {
//       name: 'Insertion Sort',
//       class: 'Sorting',
//       description:
//         'A sorting algorithm that builds a sorted region one element at a time, inserting each new element into its correct position among the elements already sorted before it.',
//       imgUrl: 'insertion-sort.jpg',
//       route: 'algorithms/insertion-sort',
//     },
//      {
//       name: 'Depth-First Search (DFS)',
//       class: 'Graph',
//       description:
//         'An algorithm for traversing or searching tree or graph data structures, exploring as far as possible along each branch before backtracking.',
//       imgUrl: 'dfs.png',
//       route: 'algorithms/dfs',
//     },
//      {
//       name: 'Best-First Search (BFS)',
//       class: 'Graph',
//       description:
//         'A graph traversal algorithm that explores nodes level by level, visiting all neighboring nodes before moving to the next level.',
//       imgUrl: 'bfs.png',
//       route: 'algorithms/bfs',
//     },
//      {
//       name: 'A* Search',
//       class: 'Graph',
//       description:
//          'A pathfinding algorithm that finds an efficient route by combining the cost already traveled with an estimate of the remaining distance to the goal.',
//       imgUrl: 'a-star.png',
//       route: 'algorithms/a-star',
//     },
//     {
//       name: 'Dijkstra',
//       class: 'Graph / Pathfinding',
//       description:
//         'A pathfinding algorithm that finds the shortest path between nodes using distance between nodes.',
//       imgUrl: 'dijkstra.png',
//       route: 'algorithms/dijkstra',
//     },
//   ];

//   public constructor(
//     private readonly _router: Router,
//     protected readonly themeService: ThemeService,
//   ) {}

//   protected onButtonClicked(algorithm: AlgorithmData): void {
//     this._router.navigateByUrl(`/${algorithm.route}`);
//   }
// }

import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { AlgorithmData } from './models/algorithm-data.type';
import { Router } from '@angular/router';
import { AlgoHeader } from '../../layout/header/header';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

// Route values below now point at /algorithms/:id instead of a flat
// path per algorithm, matching the routing change in app.routes.ts.
// This page's own layout (card grid) is a placeholder from before the
// redesign and is expected to be replaced by the real Landing Page —
// only the destination each card navigates to changed here, not this
// page's own design.
@Component({
  selector: 'algo-home',
  imports: [Button, Card, AlgoHeader, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // name/class/description are now translation keys (see
  // core/i18n/home.translations.ts), resolved in the template via the
  // `translate` pipe rather than stored as literal English text here.
  protected readonly algorithmData: AlgorithmData[] = [
    {
      nameKey: 'home.algorithm.mergeSort.name',
      classKey: 'home.algorithm.mergeSort.class',
      descriptionKey: 'home.algorithm.mergeSort.description',
      imgUrl: 'merge-sort.jpg',
      route: 'algorithms/merge-sort',
    },
    {
      nameKey: 'home.algorithm.bubbleSort.name',
      classKey: 'home.algorithm.bubbleSort.class',
      descriptionKey: 'home.algorithm.bubbleSort.description',
      imgUrl: 'bubble-sort.jpg',
      route: 'algorithms/bubble-sort',
    },
    {
      nameKey: 'home.algorithm.binarySearch.name',
      classKey: 'home.algorithm.binarySearch.class',
      descriptionKey: 'home.algorithm.binarySearch.description',
      imgUrl: 'binary-search.jpg',
      route: 'algorithms/binary-search',
    },
    {
      nameKey: 'home.algorithm.linearSearch.name',
      classKey: 'home.algorithm.linearSearch.class',
      descriptionKey: 'home.algorithm.linearSearch.description',
      imgUrl: 'linear-search.jpg',
      route: 'algorithms/linear-search',
    },
    {
      nameKey: 'home.algorithm.quickSort.name',
      classKey: 'home.algorithm.quickSort.class',
      descriptionKey: 'home.algorithm.quickSort.description',
      imgUrl: 'quick-sort.jpg',
      route: 'algorithms/quick-sort',
    },
    {
      nameKey: 'home.algorithm.selectionSort.name',
      classKey: 'home.algorithm.selectionSort.class',
      descriptionKey: 'home.algorithm.selectionSort.description',
      imgUrl: 'selection-sort.jpg',
      route: 'algorithms/selection-sort',
    },
    {
      nameKey: 'home.algorithm.insertionSort.name',
      classKey: 'home.algorithm.insertionSort.class',
      descriptionKey: 'home.algorithm.insertionSort.description',
      imgUrl: 'insertion-sort.jpg',
      route: 'algorithms/insertion-sort',
    },
    {
      nameKey: 'home.algorithm.dfs.name',
      classKey: 'home.algorithm.dfs.class',
      descriptionKey: 'home.algorithm.dfs.description',
      imgUrl: 'dfs.png',
      route: 'algorithms/dfs',
    },
    {
      nameKey: 'home.algorithm.bfs.name',
      classKey: 'home.algorithm.bfs.class',
      descriptionKey: 'home.algorithm.bfs.description',
      imgUrl: 'bfs.png',
      route: 'algorithms/bfs',
    },
    {
      nameKey: 'home.algorithm.aStar.name',
      classKey: 'home.algorithm.aStar.class',
      descriptionKey: 'home.algorithm.aStar.description',
      imgUrl: 'a-star.png',
      route: 'algorithms/a-star',
    },
    {
      nameKey: 'home.algorithm.dijkstra.name',
      classKey: 'home.algorithm.dijkstra.class',
      descriptionKey: 'home.algorithm.dijkstra.description',
      imgUrl: 'dijkstra.png',
      route: 'algorithms/dijkstra',
    },
  ];

  public constructor(
    private readonly _router: Router,
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
  ) {}

  protected onButtonClicked(algorithm: AlgorithmData): void {
    this._router.navigateByUrl(`/${algorithm.route}`);
  }
}