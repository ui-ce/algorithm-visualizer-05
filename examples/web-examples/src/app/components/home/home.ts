import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { AlgorithmData } from './models/algorithm-data.type';
import { Router } from '@angular/router';
import { AlgoHeader } from '../../layout/header/header';
import { ThemeService } from '../../core/services/theme.service';

// Route values below now point at /algorithms/:id instead of a flat
// path per algorithm, matching the routing change in app.routes.ts.
// This page's own layout (card grid) is a placeholder from before the
// redesign and is expected to be replaced by the real Landing Page —
// only the destination each card navigates to changed here, not this
// page's own design.
@Component({
  selector: 'algo-home',
  imports: [Button, Card, AlgoHeader],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly algorithmData: AlgorithmData[] = [
    {
      name: 'Depth-First Search (DFS)',
      class: 'Graph',
      description:
        'An algorithm for traversing or searching tree or graph data structures, exploring as far as possible along each branch before backtracking.',
      imgUrl: 'dfs.png',
      route: 'algorithms/dfs',
    },
    {
      name: 'Merge Sort',
      class: 'Sorting',
      description:
        'A divide-and-conquer sorting algorithm that divides the array into halves, sorts them recursively, and then merges the sorted halves.',
      imgUrl: 'merge-sort.jpg',
      route: 'algorithms/merge-sort',
    },
    {
      name: 'Bubble Sort',
      class: 'Sorting',
      description:
        'A simple comparison-based sorting algorithm where each pair of adjacent elements is compared and swapped if they are in the wrong order.',
      imgUrl: 'bubble-sort.jpg',
      route: 'algorithms/bubble-sort',
    },
    {
      name: 'Binary Search',
      class: 'Searching',
      description:
        'An efficient algorithm for finding a target value within a sorted array by repeatedly dividing the search interval in half.',
      imgUrl: 'binary-search.jpg',
      route: 'algorithms/binary-search',
    },
    {
      name: 'Dijkstra',
      class: 'Graph / Pathfinding',
      description:
        'A pathfinding algorithm that finds the shortest path between nodes using distance between nodes.',
      imgUrl: 'dijkstra.png',
      route: 'algorithms/dijkstra',
    },
  ];

  public constructor(
    private readonly _router: Router,
    protected readonly themeService: ThemeService,
  ) {}

  protected onButtonClicked(algorithm: AlgorithmData): void {
    this._router.navigateByUrl(`/${algorithm.route}`);
  }
}
