import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlgoHeader } from '../../layout/header/header';
import { AlgoFooter } from '../../layout/footer/footer';
import { AlgoButton } from '../../design-system/button/button';
import { MiniSortDemo } from './mini-sort-demo/mini-sort-demo';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import type { AlgorithmData } from '../home/models/algorithm-data.type';

type AlgorithmCategory = 'sorting' | 'searching' | 'graph';

interface LandingAlgorithm extends AlgorithmData {
  readonly category: AlgorithmCategory;
}

// Reuses the exact translation keys already defined in home.translation.ts
// (home.algorithm.*) so algorithm names/descriptions stay in sync with the
// existing /home grid instead of forking into a second copy that could
// drift out of translation. Only the `category` field is new here, used
// to group the picker into three columns and to pick the right hover
// glyph (bars / cells / dots) per card in landing.scss.
const ALGORITHMS: LandingAlgorithm[] = [
  {
    nameKey: 'home.algorithm.bubbleSort.name',
    classKey: 'home.algorithm.bubbleSort.class',
    descriptionKey: 'home.algorithm.bubbleSort.description',
    imgUrl: 'bubble-sort.jpg',
    route: 'algorithms/bubble-sort',
    category: 'sorting',
  },
  {
    nameKey: 'home.algorithm.mergeSort.name',
    classKey: 'home.algorithm.mergeSort.class',
    descriptionKey: 'home.algorithm.mergeSort.description',
    imgUrl: 'merge-sort.jpg',
    route: 'algorithms/merge-sort',
    category: 'sorting',
  },
  {
    nameKey: 'home.algorithm.quickSort.name',
    classKey: 'home.algorithm.quickSort.class',
    descriptionKey: 'home.algorithm.quickSort.description',
    imgUrl: 'quick-sort.jpg',
    route: 'algorithms/quick-sort',
    category: 'sorting',
  },
  {
    nameKey: 'home.algorithm.selectionSort.name',
    classKey: 'home.algorithm.selectionSort.class',
    descriptionKey: 'home.algorithm.selectionSort.description',
    imgUrl: 'selection-sort.jpg',
    route: 'algorithms/selection-sort',
    category: 'sorting',
  },
  {
    nameKey: 'home.algorithm.insertionSort.name',
    classKey: 'home.algorithm.insertionSort.class',
    descriptionKey: 'home.algorithm.insertionSort.description',
    imgUrl: 'insertion-sort.jpg',
    route: 'algorithms/insertion-sort',
    category: 'sorting',
  },
  {
    nameKey: 'home.algorithm.linearSearch.name',
    classKey: 'home.algorithm.linearSearch.class',
    descriptionKey: 'home.algorithm.linearSearch.description',
    imgUrl: 'linear-search.jpg',
    route: 'algorithms/linear-search',
    category: 'searching',
  },
  {
    nameKey: 'home.algorithm.binarySearch.name',
    classKey: 'home.algorithm.binarySearch.class',
    descriptionKey: 'home.algorithm.binarySearch.description',
    imgUrl: 'binary-search.jpg',
    route: 'algorithms/binary-search',
    category: 'searching',
  },
  {
    nameKey: 'home.algorithm.dfs.name',
    classKey: 'home.algorithm.dfs.class',
    descriptionKey: 'home.algorithm.dfs.description',
    imgUrl: 'dfs.png',
    route: 'algorithms/dfs',
    category: 'graph',
  },
  {
    nameKey: 'home.algorithm.bfs.name',
    classKey: 'home.algorithm.bfs.class',
    descriptionKey: 'home.algorithm.bfs.description',
    imgUrl: 'bfs.png',
    route: 'algorithms/bfs',
    category: 'graph',
  },
  {
    nameKey: 'home.algorithm.aStar.name',
    classKey: 'home.algorithm.aStar.class',
    descriptionKey: 'home.algorithm.aStar.description',
    imgUrl: 'a-star.png',
    route: 'algorithms/a-star',
    category: 'graph',
  },
  {
    nameKey: 'home.algorithm.dijkstra.name',
    classKey: 'home.algorithm.dijkstra.class',
    descriptionKey: 'home.algorithm.dijkstra.description',
    imgUrl: 'dijkstra.png',
    route: 'algorithms/dijkstra',
    category: 'graph',
  },
];

// Product tour cards (section 3.5, between Features and the Battle
// section). `image` is a filename under src/assets/screenshots/ — drop
// real screenshots there with these exact names and they'll render;
// until then the mockup frame falls back to a plain gradient instead of
// a broken-image icon (see landing.scss .landing__tour-frame).
interface TourItem {
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly image: string;
  readonly ctaRoute: string;
}

const TOUR_ITEMS: TourItem[] = [
  {
    titleKey: 'landing.tour.learn.title',
    descriptionKey: 'landing.tour.learn.description',
    image: 'learn.png',
    ctaRoute: 'algorithms/bubble-sort',
  },
  {
    titleKey: 'landing.tour.practice.title',
    descriptionKey: 'landing.tour.practice.description',
    image: 'practice.png',
    ctaRoute: 'algorithms/bubble-sort',
  },
  {
    titleKey: 'landing.tour.test.title',
    descriptionKey: 'landing.tour.test.description',
    image: 'test.png',
    ctaRoute: 'algorithms/bubble-sort/test',
  },
];

@Component({
  selector: 'algo-landing',
  imports: [AlgoHeader, AlgoFooter, AlgoButton, MiniSortDemo, TranslatePipe, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  protected readonly sortingAlgorithms = ALGORITHMS.filter((a) => a.category === 'sorting');
  protected readonly searchingAlgorithms = ALGORITHMS.filter((a) => a.category === 'searching');
  protected readonly graphAlgorithms = ALGORITHMS.filter((a) => a.category === 'graph');
  protected readonly tourItems = TOUR_ITEMS;

  public constructor(
    private readonly _router: Router,
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
  ) {}

  protected goToAlgorithm(algorithm: AlgorithmData): void {
    this._router.navigateByUrl(`/${algorithm.route}`);
  }

  protected goToRoute(route: string): void {
    this._router.navigateByUrl(`/${route}`);
  }

  protected goToAllAlgorithms(): void {
    this._router.navigateByUrl('/home');
  }

  protected goToRegister(): void {
    this._router.navigateByUrl('/register');
  }

  protected goToQuiz(): void {
    this._router.navigateByUrl('/algorithms/bubble-sort/test');
  }

  protected scrollToDemo(): void {
    document.getElementById('landing-hero-demo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  protected scrollToPicker(): void {
    document.getElementById('landing-picker')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Background image path for a tour frame, built here rather than
  // inline in the template so a future real-asset-pipeline swap (e.g. a
  // CDN prefix) only touches one place.
  protected tourImagePath(image: string): string {
    return `assets/screenshots/${image}`;
  }
}
