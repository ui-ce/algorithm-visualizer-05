import { Component, Input, inject } from '@angular/core';
import { SolarLockKeyholeMinimalisticLinear } from '@solar-icons/angular';
import { VisualizationArea } from '../../../practice/components/visualization-area/visualization-area';
import { VisualizationLegend } from '../../../practice/components/visualization-legend/visualization-legend';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { LanguageService } from '../../../../core/services/language.service';
import { translate } from '../../../../core/i18n/translations';
import type { LegendItem } from '../../../practice/components/visualization-legend/visualization-legend.types';
import type { CompareRun } from '../../utils/build-recording.util';

// The chart box for one column of the Compare page. Deliberately a
// stripped-down sibling of Practice's VisualizationSection: same "Step
// X of Y" header and legend, but no Speed control and no fullscreen
// toggle — this page has neither (see compare-run-controls for the
// shared Play/Pause + Again that actually drives both columns).
//
// SolarLockKeyholeMinimalisticLinear hasn't been individually confirmed
// against the installed @solar-icons/angular package (no lock icon was
// used anywhere else in the codebase to check the name against) — same
// "flagged as a guess, not stated as fact" caveat the project brief
// asks for.
@Component({
  selector: 'algo-compare-visualization',
  imports: [VisualizationArea, VisualizationLegend, SolarLockKeyholeMinimalisticLinear, TranslatePipe],
  templateUrl: './compare-visualization.html',
  styleUrl: './compare-visualization.scss',
})
export class CompareVisualization {
  private readonly languageService = inject(LanguageService);

  @Input()
  public run: CompareRun | null = null;

  @Input()
  public frameIndex = 0;

  // The two columns share one step counter (see compare.ts), but the
  // two algorithms almost never take the same number of steps — once
  // the shorter run finishes, this just holds it on its own last frame
  // instead of indexing past the end of its animation array.
  protected get clampedFrameIndex(): number {
    if (!this.run) {
      return 0;
    }
    return Math.min(this.frameIndex, this.run.totalSteps - 1);
  }

  // Reuses the exact same 'practice.legend.*' translation keys Practice's
  // own `legendItems` getter resolves (see practice.ts) — build-recording
  // util only hands back *which* of the three sets applies ('sort' /
  // 'search' / 'graph'), since it has no LanguageService to translate
  // with itself.
  protected get legendItems(): LegendItem[] {
    if (!this.run) {
      return [];
    }
    const language = this.languageService.currentLanguage();
    const t = (key: string) => translate(key, language);

    if (this.run.legendKind === 'graph') {
      return [
        { label: t('practice.legend.default'), colorToken: 'viz-default' },
        { label: t('practice.legend.graph.frontier'), colorToken: 'viz-active' },
        { label: t('practice.legend.graph.current'), colorToken: 'viz-comparing' },
        { label: t('practice.legend.graph.visited'), colorToken: 'viz-explored' },
        { label: t('practice.legend.graph.finalPath'), colorToken: 'viz-sorted' },
      ];
    }

    if (this.run.legendKind === 'search') {
      return [
        { label: t('practice.legend.default'), colorToken: 'viz-default' },
        { label: t('practice.legend.search.range'), colorToken: 'viz-active' },
        { label: t('practice.legend.search.comparing'), colorToken: 'viz-comparing' },
        { label: t('practice.legend.search.eliminated'), colorToken: 'viz-swapping' },
        { label: t('practice.legend.search.found'), colorToken: 'viz-sorted' },
      ];
    }

    return [
      { label: t('practice.legend.default'), colorToken: 'viz-default' },
      { label: t('practice.legend.active'), colorToken: 'viz-active' },
      { label: t('practice.legend.comparing'), colorToken: 'viz-comparing' },
      { label: t('practice.legend.swapping'), colorToken: 'viz-swapping' },
      { label: t('practice.legend.sorted'), colorToken: 'viz-sorted' },
    ];
  }
}
