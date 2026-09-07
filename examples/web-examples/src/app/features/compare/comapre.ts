import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlgoHeader } from '../../layout/header/header';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { translate } from '../../core/i18n/translations';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import type { BreadcrumbItem } from '../../layout/header/header-breadcrumb.type';
import { ALGORITHM_CONTENT } from '../practice/data/algorithm-content.registry';
import { ALGORITHM_CONTENT_FA } from '../practice/data/algorithm-content.registry.fa';
import type { AlgorithmContent } from '../practice/data/algorithm-content.types';

import { CompareColumn } from './components/compare-column/compare-column';
import { CompareRunControls } from './components/compare-run-controls/compare-run-controls';
import {
  COMPARE_ALGORITHMS,
  algorithmsInCategory,
  getCompareAlgorithmMeta,
  type CompareCategory,
} from './data/compare-catalog';
import { buildCompareRun, generateSharedArray, GRAPH_ALGORITHM_IDS, type CompareRun } from './utils/build-recording.util';
import { compareComplexity } from './utils/complexity-rank.util';
import type { ComplexityVerdicts } from './compare.types';

// Same fixed playback cadence Practice's NavigationControls plays at
// its default (1x) speed — this page has no Speed control of its own
// (see compare-run-controls.ts), so there's only ever one rate.
const PLAYBACK_INTERVAL_MS = 550;

@Component({
  selector: 'algo-compare-page',
  imports: [AlgoHeader, CompareColumn, CompareRunControls, TranslatePipe],
  templateUrl: './compare.html',
  styleUrl: './compare.scss',
})
export class ComparePage implements OnDestroy {
  protected algorithm1Id: string;
  protected algorithm2Id: string | null = null;

  // The array both sort/search columns execute against, so the two
  // charts really are running on identical data (per spec) — regenerated
  // only when the category itself changes (a fresh graph pair swap
  // doesn't need one at all; see buildRun below). Unused for the graph
  // category, where each column pulls its own sample graph instead.
  private sharedArray: number[] = generateSharedArray();

  protected run1: CompareRun | null = null;
  protected run2: CompareRun | null = null;

  protected currentStep = 0;
  protected isPlaying = false;
  private playbackIntervalId: ReturnType<typeof setInterval> | null = null;

  public constructor(
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
    route: ActivatedRoute,
  ) {
    const requestedId = route.snapshot.paramMap.get('id');
    // Falls back to the first algorithm in the catalog (Bubble Sort)
    // if the id in the URL isn't one Compare knows about, the same way
    // PracticePage falls back to 'bubble-sort' for an unknown :id.
    this.algorithm1Id = getCompareAlgorithmMeta(requestedId)?.id ?? COMPARE_ALGORITHMS[0].id;
    this.rebuildRun1();
  }

  public ngOnDestroy(): void {
    this.stopPlayback();
  }

  protected get algorithm1Meta() {
    return getCompareAlgorithmMeta(this.algorithm1Id);
  }

  protected get algorithm2Meta() {
    return getCompareAlgorithmMeta(this.algorithm2Id);
  }

  protected get category(): CompareCategory {
    return this.algorithm1Meta?.category ?? 'sorting';
  }

  // Algorithm-2's dropdown only ever lists the rest of Algorithm-1's
  // category — the whole point of the category system (see
  // compare-catalog.ts).
  protected get algorithm2Options() {
    return algorithmsInCategory(this.category, this.algorithm1Id);
  }

  // Algorithm-1 is reselectable too (its dropdown isn't spec'd as
  // locked), scoped the same way so the two columns can never end up
  // comparing across categories.
  protected get algorithm1Options() {
    return algorithmsInCategory(this.category, this.algorithm2Id);
  }

  protected get bothSelected(): boolean {
    return this.algorithm1Id !== null && this.algorithm2Id !== null;
  }

  protected get breadcrumbs(): BreadcrumbItem[] {
    const language = this.languageService.currentLanguage();
    return [
      { label: translate('practice.breadcrumb.home', language), route: '/' },
      { label: translate('practice.breadcrumb.algorithms', language), route: '/', fragment: 'landing-picker' },
      { label: this.algorithmName(this.algorithm1Id), route: `/algorithms/${this.algorithm1Id}` },
      { label: translate('compare.breadcrumb.compare', language), route: '' },
    ];
  }

  protected algorithmName(id: string | null): string {
    const meta = getCompareAlgorithmMeta(id);
    if (!meta) {
      return '';
    }
    return translate(meta.nameKey, this.languageService.currentLanguage());
  }

  protected content(id: string | null): AlgorithmContent | null {
    if (!id) {
      return null;
    }
    const language = this.languageService.currentLanguage();
    if (language === 'fa') {
      return ALGORITHM_CONTENT_FA[id] ?? ALGORITHM_CONTENT[id] ?? null;
    }
    return ALGORITHM_CONTENT[id] ?? null;
  }

  // Only resolves once both sides are selected — see
  // complexity-rank.util.ts for why an unrankable pair (or a missing
  // side) just yields nulls instead of guessing at a winner.
  protected get verdicts(): ComplexityVerdicts | null {
    const content1 = this.content(this.algorithm1Id);
    const content2 = this.content(this.algorithm2Id);
    if (!content1 || !content2) {
      return null;
    }

    const resolve = (metric: keyof ComplexityVerdicts) => {
      const winner = compareComplexity(content1.complexity[metric], content2.complexity[metric]);
      if (winner === null) {
        return null;
      }
      return winner === 'left' ? 'left' : 'right';
    };

    return {
      bestTime: resolve('bestTime'),
      averageTime: resolve('averageTime'),
      worstTime: resolve('worstTime'),
      space: resolve('space'),
    };
  }

  protected get totalSteps(): number {
    return Math.max(this.run1?.totalSteps ?? 0, this.run2?.totalSteps ?? 0);
  }

  protected onAlgorithm1Change(id: string): void {
    const nextMeta = getCompareAlgorithmMeta(id);
    const categoryChanged = nextMeta?.category !== this.category;
    this.algorithm1Id = id;

    if (categoryChanged) {
      // The two sides can never straddle two categories — dropping
      // Algorithm-2 back to unselected is the only sound option here,
      // since nothing in the old category's list is valid anymore.
      this.algorithm2Id = null;
      this.run2 = null;
      if (!GRAPH_ALGORITHM_IDS.has(id)) {
        this.sharedArray = generateSharedArray();
      }
    }

    this.rebuildRun1();
    this.resetPlayback();
  }

  protected onAlgorithm2Change(id: string): void {
    this.algorithm2Id = id;
    this.rebuildRun2();
    this.resetPlayback();
  }

  protected onPlayToggle(): void {
    if (!this.bothSelected) {
      return;
    }
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startPlayback();
    } else {
      this.stopPlayback();
    }
  }

  protected onAgain(): void {
    if (!this.bothSelected) {
      return;
    }
    this.resetPlayback();
  }

  private rebuildRun1(): void {
    const useSharedArray = GRAPH_ALGORITHM_IDS.has(this.algorithm1Id) ? null : this.sharedArray;
    this.run1 = buildCompareRun(this.algorithm1Id, this.algorithmName(this.algorithm1Id), useSharedArray);
  }

  private rebuildRun2(): void {
    if (!this.algorithm2Id) {
      this.run2 = null;
      return;
    }
    const useSharedArray = GRAPH_ALGORITHM_IDS.has(this.algorithm2Id) ? null : this.sharedArray;
    this.run2 = buildCompareRun(this.algorithm2Id, this.algorithmName(this.algorithm2Id), useSharedArray);
  }

  private resetPlayback(): void {
    this.stopPlayback();
    this.isPlaying = false;
    this.currentStep = 0;
  }

  private startPlayback(): void {
    this.stopPlayback();
    this.playbackIntervalId = setInterval(() => {
      if (this.currentStep >= this.totalSteps - 1) {
        this.stopPlayback();
        this.isPlaying = false;
        return;
      }
      this.currentStep += 1;
    }, PLAYBACK_INTERVAL_MS);
  }

  private stopPlayback(): void {
    if (this.playbackIntervalId !== null) {
      clearInterval(this.playbackIntervalId);
      this.playbackIntervalId = null;
    }
  }
}