import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';

import { AlgoHeader } from '../../layout/header/header';
import { AlgoButton } from '../../design-system/button/button';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { translate } from '../../core/i18n/translations';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import type { BreadcrumbItem } from '../../layout/header/header-breadcrumb.type';

import { VisualizationArea } from '../practice/components/visualization-area/visualization-area';
import { NavigationControls } from '../practice/components/navigation-controls/navigation-controls';
import { VisualizationLegend } from '../practice/components/visualization-legend/visualization-legend';
import type { LegendItem } from '../practice/components/visualization-legend/visualization-legend.types';

import {
  CHART_METADATA_ENTRY,
  runCustomArrayAlgorithm,
  type CustomRunError,
  type PythonExecutionFrame,
} from '../../algorithm/custom-algorithm-runner';

import { basicSetup } from 'codemirror';
import { python } from '@codemirror/lang-python';
import { EditorState, StateEffect, StateField } from '@codemirror/state';
import { Decoration, type DecorationSet, EditorView } from '@codemirror/view';

// No injected globals anymore — this is meant to read exactly like a
// normal .py file someone would run on their own machine. The array
// (or stack, or whatever) is just a variable the person declares
// themselves, in whatever name they like; the runner's array-detection
// picks it up from the trace regardless of what it's called (see
// custom-algorithm-runner.ts / python-execution.worker.ts).
const STARTER_CODE = `arr = [42, 17, 31, 8, 25, 14, 39, 5]

for i in range(len(arr) - 1):
    for j in range(len(arr) - i - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
`;

const PLAYBACK_INTERVAL_MS = 550;

const setActiveLineEffect = StateEffect.define<DecorationSet>();

const activeLineField = StateField.define<DecorationSet>({
  create: () => Decoration.none,

  update(value, transaction) {
    let next = value.map(transaction.changes);

    for (const effect of transaction.effects) {
      if (effect.is(setActiveLineEffect)) {
        next = effect.value;
      }
    }

    return next;
  },

  provide: (field) => EditorView.decorations.from(field),
});

const EDITOR_THEME = EditorView.theme({
  '&': {
    height: '100%',
    backgroundColor: 'transparent',
    color: 'var(--color-text-primary)',
  },
  '.cm-scroller': {
    overflow: 'auto',
    fontFamily: "'Fira Code', 'Consolas', monospace",
  },
  '.cm-content': {
    minHeight: '100%',
    padding: '14px 0',
    caretColor: 'var(--color-text-primary)',
  },
  '.cm-gutters': {
    backgroundColor: 'var(--color-surface-container)',
    color: 'var(--color-text-tertiary)',
    border: 'none',
    borderRight: '1px solid var(--color-border-default)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'color-mix(in srgb, var(--color-viz-active) 12%, transparent)',
    color: 'var(--color-text-primary)',
  },
  '.cm-active-python-line': {
    backgroundColor: 'color-mix(in srgb, var(--color-viz-active) 18%, transparent)',
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: 'color-mix(in srgb, var(--color-viz-active) 28%, transparent) !important',
  },
});

@Component({
  selector: 'algo-custom-algorithm-page',
  imports: [
    FormsModule,
    KeyValuePipe,
    AlgoHeader,
    AlgoButton,
    VisualizationArea,
    NavigationControls,
    VisualizationLegend,
    TranslatePipe,
  ],
  templateUrl: './custom-algorithm.page.html',
  styleUrl: './custom-algorithm.page.scss',
})
export class CustomAlgorithmPage implements AfterViewInit, OnDestroy {
  @ViewChild('pythonEditorHost', { static: true })
  private readonly pythonEditorHost!: ElementRef<HTMLDivElement>;

  private editorView: EditorView | null = null;
  private playbackIntervalId: ReturnType<typeof setInterval> | null = null;
  private suppressEditorChange = false;

  protected code = STARTER_CODE;

  protected executionFrames: PythonExecutionFrame[] = [];
  protected currentVariables: Record<string, unknown> = {};
  protected activeLineNumber: number | null = null;

  protected animation: Animation | null = null;
  protected rendererMetadata: RendererMetadata | null = null;
  protected frameIndex = 0;
  protected totalSteps = 0;
  protected isPlaying = false;
  protected isRunning = false;

  protected runError: CustomRunError | null = null;
  protected hasRunSuccessfully = false;

  public constructor(
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngAfterViewInit(): void {
    this.createPythonEditor();
  }

  public ngOnDestroy(): void {
    this.stopPlayback();
    this.editorView?.destroy();
    this.editorView = null;
  }

  protected get breadcrumbs(): BreadcrumbItem[] {
    const language = this.languageService.currentLanguage();
    return [
      { label: translate('practice.breadcrumb.home', language), route: '/' },
      { label: translate('customAlgorithm.breadcrumb.custom', language), route: '' },
    ];
  }

  protected get isFa(): boolean {
    return this.languageService.currentLanguage() === 'fa';
  }

  protected get variablesLabel(): string {
    return this.isFa ? 'متغیرها' : 'Variables';
  }

  protected get executionLabel(): string {
    return this.isFa ? 'اجرای Python' : 'Python execution';
  }

  protected get lineLabel(): string {
    return this.isFa ? 'خط فعال' : 'Active line';
  }

  protected get readyLabel(): string {
    return this.isFa ? 'کد Python را اجرا کنید.' : 'Run the Python code to start.';
  }

  protected get loadingLabel(): string {
    return this.isFa ? 'در حال اجرای Python...' : 'Running Python...';
  }

  protected get emptyVariablesLabel(): string {
    return this.isFa ? 'هنوز متغیری برای نمایش وجود ندارد.' : 'No variables to display yet.';
  }

  // 'compare' is intentionally left out here — the runner only ever
  // sees resulting values after each traced line, never which
  // expression the code evaluated to get there, so it has no honest
  // way to know a given line *was* a comparison. Showing that legend
  // item would just be a new version of the old "always says sorted"
  // problem: a color the person can't actually trust. 'sorted' is
  // real: custom-algorithm-runner.ts only ever applies it when the
  // final values are genuinely in ascending order.
  protected get legendItems(): LegendItem[] {
    const language = this.languageService.currentLanguage();
    return [
      { label: translate('customAlgorithm.legend.default', language), colorToken: 'viz-default' },
      { label: translate('customAlgorithm.legend.active', language), colorToken: 'viz-active' },
      { label: translate('customAlgorithm.legend.swap', language), colorToken: 'viz-swapping' },
      { label: translate('customAlgorithm.legend.sorted', language), colorToken: 'viz-sorted' },
    ];
  }

  protected onCodeChanged(): void {
    if (this.suppressEditorChange) {
      return;
    }

    if (!this.editorView) {
      return;
    }

    this.code = this.editorView.state.doc.toString();
    this.resetRunState();
  }

  protected async onRunClick(): Promise<void> {
    this.stopPlayback();
    this.isPlaying = false;
    this.isRunning = true;
    this.runError = null;
    this.hasRunSuccessfully = false;
    this.executionFrames = [];
    this.currentVariables = {};
    this.activeLineNumber = null;
    this.animation = null;
    this.rendererMetadata = null;
    this.totalSteps = 0;
    this.frameIndex = 0;

    try {
      const result = await runCustomArrayAlgorithm(
        this.code,
        this.languageService.currentLanguage(),
      );

      if (result.error || !result.recording) {
        this.isRunning = false;
        this.runError = result.error ?? {
          message: this.isFa ? 'اجرای Python ناموفق بود.' : 'Python execution failed.',
          line: null,
        };
        this.changeDetectorRef.markForCheck();
        return;
      }

      this.runError = null;
      this.executionFrames = result.execution;
      this.hasRunSuccessfully = true;
      this.animation = new FramerEngine().getAnimation(result.recording);
      this.totalSteps = Math.min(this.animation.length, this.executionFrames.length);
      this.rendererMetadata = {
        documentName: translate('customAlgorithm.title', this.languageService.currentLanguage()),
        objectMetaData: [CHART_METADATA_ENTRY],
      };

      this.isRunning = false;
      this.stepTo(0);

      // Auto-play as soon as a run succeeds — no need to hit Play
      // manually the first time. Same guard onPlayToggle() already
      // uses: nothing to animate with 0 or 1 total frames.
      if (this.totalSteps > 1) {
        this.isPlaying = true;
        this.startPlayback();
      }

      this.changeDetectorRef.markForCheck();
    } catch (error) {
      this.isRunning = false;
      this.runError = {
        message:
          error instanceof Error
            ? error.message
            : this.isFa
              ? 'خطای ناشناخته هنگام اجرای Python رخ داد.'
              : 'An unknown error occurred while running Python.',
        line: null,
      };
      this.changeDetectorRef.markForCheck();
    }
  }

  protected onPrevious(): void {
    this.stepTo(this.frameIndex - 1);
  }

  protected onNext(): void {
    this.stepTo(this.frameIndex + 1);
  }

  protected onPlayToggle(): void {
    if (this.totalSteps <= 1) {
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
    if (this.totalSteps <= 1) {
      return;
    }

    this.stopPlayback();
    this.stepTo(0);
    this.isPlaying = true;
    this.startPlayback();
  }

  protected formatVariable(value: unknown): string {
    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'undefined') {
      return 'undefined';
    }

    try {
      const json = JSON.stringify(value);
      return json ?? String(value);
    } catch {
      return String(value);
    }
  }

  private createPythonEditor(): void {
    if (!this.pythonEditorHost?.nativeElement) {
      return;
    }

    this.editorView = new EditorView({
      parent: this.pythonEditorHost.nativeElement,
      state: EditorState.create({
        doc: this.code,
        extensions: [
          basicSetup,
          python(),
          activeLineField,
          EDITOR_THEME,
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged && !this.suppressEditorChange) {
              this.code = update.state.doc.toString();
              this.resetRunState();
            }
          }),
        ],
      }),
    });
  }

  private setActiveEditorLine(lineNumber: number | null): void {
    if (!this.editorView) {
      return;
    }

    if (
      lineNumber === null ||
      lineNumber < 1 ||
      lineNumber > this.editorView.state.doc.lines
    ) {
      this.editorView.dispatch({
        effects: setActiveLineEffect.of(Decoration.none),
      });
      return;
    }

    const line = this.editorView.state.doc.line(lineNumber);
    const decoration = Decoration.set([
      Decoration.line({ class: 'cm-active-python-line' }).range(line.from),
    ]);

    this.editorView.dispatch({
      effects: setActiveLineEffect.of(decoration),
      scrollIntoView: true,
    });
  }

  private resetRunState(): void {
    this.stopPlayback();
    this.isPlaying = false;
    this.isRunning = false;
    this.runError = null;
    this.hasRunSuccessfully = false;
    this.animation = null;
    this.rendererMetadata = null;
    this.executionFrames = [];
    this.currentVariables = {};
    this.totalSteps = 0;
    this.frameIndex = 0;
    this.activeLineNumber = null;
    this.setActiveEditorLine(null);
  }

  private stepTo(index: number): void {
    if (this.totalSteps === 0 || this.executionFrames.length === 0) {
      return;
    }

    const clamped = Math.max(0, Math.min(index, this.totalSteps - 1));
    this.frameIndex = clamped;

    const frame = this.executionFrames[clamped];
    if (!frame) {
      return;
    }

    this.activeLineNumber = frame.line;
    this.currentVariables = frame.variables;
    this.setActiveEditorLine(frame.line);
    this.changeDetectorRef.markForCheck();
  }

  private startPlayback(): void {
    this.stopPlayback();

    this.playbackIntervalId = setInterval(() => {
      if (this.frameIndex >= this.totalSteps - 1) {
        this.stopPlayback();
        this.isPlaying = false;
        this.changeDetectorRef.markForCheck();
        return;
      }

      this.stepTo(this.frameIndex + 1);
    }, PLAYBACK_INTERVAL_MS);
  }

  private stopPlayback(): void {
    if (this.playbackIntervalId !== null) {
      clearInterval(this.playbackIntervalId);
      this.playbackIntervalId = null;
    }
  }
}