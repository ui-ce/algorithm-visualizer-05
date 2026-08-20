import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlgoButton } from '../../../../design-system/button/button';
import { LanguageService } from '../../../../core/services/language.service';
import { translate } from '../../../../core/i18n/translations';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { TranslateVarPipe } from '../../../../core/i18n/translate-var.pipe';
import type { CustomInputResult, GraphEdgeInput } from './custom-input-modal.types';

const MAX_ELEMENT_COUNT = 40;
const DEFAULT_FIELD_COUNT = 10;
const FIELDS_PER_ROW = 5;

// DFS's and BFS's recorders both hardcode their start node to 'A' (see
// algorithm/dfs.ts and algorithm/bfs.ts) — this isn't a UI choice, it's
// a constraint of the current recorders, so the start field is fixed
// for both and just explains that instead of pretending to be editable.
const DFS_FIXED_START = 'A';

// Algorithms whose graph is directed and weighted, and therefore need
// an explicit start *and* end node plus a weight on every typed edge
// ("from to weight"). The rest (dfs, bfs) are undirected and
// unweighted ("from to") with a fixed start node — see isWeightedGraph.
const WEIGHTED_GRAPH_ALGORITHM_IDS = new Set(['dijkstra', 'a-star']);
const GRAPH_ALGORITHM_IDS = new Set(['dijkstra', 'dfs', 'bfs', 'a-star']);

type Mode = 'array' | 'array-with-target' | 'graph';

@Component({
  selector: 'algo-custom-input-modal',
  imports: [AlgoButton, TranslatePipe, TranslateVarPipe],
  templateUrl: './custom-input-modal.html',
  styleUrl: './custom-input-modal.scss',
})
export class CustomInputModal {
  public constructor(private readonly _languageService: LanguageService) {}

  @Input()
  public isOpen = false;

  // Drives which fields the modal shows. binary-search gets the same
  // array grid plus a target field; dijkstra/dfs replace the array grid
  // entirely with a graph edge-list, since an array has no meaning for
  // either of them.
  @Input()
  public algorithmId = '';

  @Output()
  public readonly closed = new EventEmitter<void>();

  @Output()
  public readonly applied = new EventEmitter<CustomInputResult>();

  protected readonly maxElementCount = MAX_ELEMENT_COUNT;
  protected readonly dfsFixedStart = DFS_FIXED_START;

  protected elementCountText = '';
  protected elementValues: string[] = [];
  protected wasClampedToMax = false;
  protected targetText = '';

  // Graph-mode state — one line per edge, "from to" (dfs) or "from to
  // weight" (dijkstra). Kept as free text rather than dynamic add/remove
  // rows: editing a graph by hand is naturally list-shaped, and a
  // textarea is the fastest way to enter or paste one until the proper
  // node/edge editor design (mentioned separately) exists.
  protected edgesText = '';
  protected startNodeText = '';
  protected endNodeText = '';

  protected get mode(): Mode {
    // Binary Search and Linear Search both search an array for a
    // target value, so both get the array grid plus a target field.
    if (this.algorithmId === 'binary-search' || this.algorithmId === 'linear-search') {
      return 'array-with-target';
    }
    if (GRAPH_ALGORITHM_IDS.has(this.algorithmId)) {
      return 'graph';
    }
    return 'array';
  }

  // Renamed from isDijkstra: dijkstra and a-star share the exact same
  // directed/weighted graph shape and both need this branch (weighted
  // "from to weight" edges, editable start/end fields) — see
  // WEIGHTED_GRAPH_ALGORITHM_IDS above.
  protected get isWeightedGraph(): boolean {
    return WEIGHTED_GRAPH_ALGORITHM_IDS.has(this.algorithmId);
  }

  // Null means no valid count has been entered yet — the 10 default
  // fields stay disabled placeholders until this resolves to a number.
  protected get parsedElementCount(): number | null {
    const parsed = Number(this.elementCountText);
    const isValid =
      this.elementCountText.trim() !== '' &&
      Number.isInteger(parsed) &&
      parsed > 0 &&
      parsed <= MAX_ELEMENT_COUNT;
    return isValid ? parsed : null;
  }

  protected get fieldsAreEnabled(): boolean {
    return this.parsedElementCount !== null;
  }

  // Shown under the count input when what's typed isn't a valid whole
  // number at all. The > 40 case no longer lands here — it's silently
  // clamped instead (see onElementCountChange / maxCountNotice below).
  protected get countErrorMessage(): string | null {
    if (this.elementCountText.trim() === '') {
      return null;
    }
    const parsed = Number(this.elementCountText);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      return translate('practice.modal.error.positiveWholeNumber', this._languageService.currentLanguage());
    }
    return null;
  }

  // Shown once, right after a >40 entry gets auto-corrected to 40.
  protected get maxCountNotice(): string | null {
    if (!this.wasClampedToMax) {
      return null;
    }
    return translate('practice.modal.notice.maxCount', this._languageService.currentLanguage()).replaceAll(
      '{max}',
      String(MAX_ELEMENT_COUNT),
    );
  }

  protected get visibleFieldCount(): number {
    return this.parsedElementCount ?? DEFAULT_FIELD_COUNT;
  }

  // Splits the flat list of field indices into rows of five for the
  // template, rather than the template doing index arithmetic itself.
  protected get rows(): number[][] {
    const indices = Array.from({ length: this.visibleFieldCount }, (_, i) => i);
    const rows: number[][] = [];
    for (let start = 0; start < indices.length; start += FIELDS_PER_ROW) {
      rows.push(indices.slice(start, start + FIELDS_PER_ROW));
    }
    return rows;
  }

  // For binary search, the target doesn't have to be one of the entered
  // values — searching for a value that isn't there is a legitimate,
  // useful case (it's what demonstrates the "not found" path).
  protected get targetErrorMessage(): string | null {
    if (this.mode !== 'array-with-target') {
      return null;
    }
    if (this.targetText.trim() === '') {
      return null;
    }
    return Number.isFinite(Number(this.targetText))
      ? null
      : translate('practice.modal.error.targetMustBeNumber', this._languageService.currentLanguage());
  }

  // One parsed { from, to, weight? } per non-blank line, or null for a
  // line that doesn't match "from to" / "from to weight".
  protected get parsedEdges(): GraphEdgeInput[] | null {
    const lines = this.edgesText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    if (lines.length === 0) {
      return null;
    }

    const edges: GraphEdgeInput[] = [];
    for (const line of lines) {
      const parts = line.split(/\s+/);
      if (this.isWeightedGraph) {
        if (parts.length !== 3) {
          return null;
        }
        const weight = Number(parts[2]);
        if (!Number.isFinite(weight)) {
          return null;
        }
        edges.push({ from: parts[0], to: parts[1], weight });
      } else {
        if (parts.length !== 2) {
          return null;
        }
        edges.push({ from: parts[0], to: parts[1] });
      }
    }
    return edges;
  }

  protected get edgesErrorMessage(): string | null {
    if (this.mode !== 'graph' || this.edgesText.trim() === '') {
      return null;
    }
    if (this.parsedEdges === null) {
      const key = this.isWeightedGraph ? 'practice.modal.error.edgesFormatDijkstra' : 'practice.modal.error.edgesFormatDefault';
      return translate(key, this._languageService.currentLanguage());
    }
    return null;
  }

  protected get graphNodeIds(): Set<string> {
    const ids = new Set<string>();
    for (const edge of this.parsedEdges ?? []) {
      ids.add(edge.from);
      ids.add(edge.to);
    }
    return ids;
  }

  protected get startNodeErrorMessage(): string | null {
    if (this.mode !== 'graph' || !this.isWeightedGraph || this.startNodeText.trim() === '') {
      return null;
    }
    if (this.parsedEdges !== null && !this.graphNodeIds.has(this.startNodeText.trim())) {
      return translate('practice.modal.error.startNodeMustAppear', this._languageService.currentLanguage());
    }
    return null;
  }

  protected get endNodeErrorMessage(): string | null {
    if (this.mode !== 'graph' || !this.isWeightedGraph || this.endNodeText.trim() === '') {
      return null;
    }
    if (this.parsedEdges !== null && !this.graphNodeIds.has(this.endNodeText.trim())) {
      return translate('practice.modal.error.endNodeMustAppear', this._languageService.currentLanguage());
    }
    return null;
  }

  // DFS's start is fixed to 'A' by the recorder, so the entered graph
  // has to actually contain that node — otherwise dfsVisualization()
  // would start from a node that doesn't exist.
  protected get dfsMissingStartNode(): boolean {
    return (
      this.mode === 'graph' &&
      !this.isWeightedGraph &&
      this.parsedEdges !== null &&
      !this.graphNodeIds.has(DFS_FIXED_START)
    );
  }

  protected get canApply(): boolean {
    if (this.mode === 'graph') {
      if (this.parsedEdges === null) {
        return false;
      }
      if (!this.isWeightedGraph) {
        return !this.dfsMissingStartNode;
      }
      const start = this.startNodeText.trim();
      const end = this.endNodeText.trim();
      return start !== '' && end !== '' && this.graphNodeIds.has(start) && this.graphNodeIds.has(end);
    }

    const count = this.parsedElementCount;
    if (count === null) {
      return false;
    }
    const valuesValid = this.elementValues
      .slice(0, count)
      .every((value) => value.trim() !== '' && Number.isFinite(Number(value)));
    if (this.mode === 'array-with-target') {
      return valuesValid && this.targetText.trim() !== '' && Number.isFinite(Number(this.targetText));
    }
    return valuesValid;
  }

  protected onElementCountChange(value: string): void {
    const parsed = Number(value);
    if (value.trim() !== '' && Number.isInteger(parsed) && parsed > MAX_ELEMENT_COUNT) {
      this.elementCountText = String(MAX_ELEMENT_COUNT);
      this.wasClampedToMax = true;
    } else {
      this.elementCountText = value;
      this.wasClampedToMax = false;
    }
    // Resize the values array to the new field count, keeping whatever
    // was already typed for indices that still exist.
    const count = this.visibleFieldCount;
    this.elementValues = Array.from({ length: count }, (_, i) => this.elementValues[i] ?? '');
  }

  protected onElementValueChange(index: number, value: string): void {
    this.elementValues[index] = value;
  }

  protected onTargetChange(value: string): void {
    this.targetText = value;
  }

  protected onEdgesChange(value: string): void {
    this.edgesText = value;
  }

  protected onStartNodeChange(value: string): void {
    this.startNodeText = value;
  }

  protected onEndNodeChange(value: string): void {
    this.endNodeText = value;
  }

  protected onApply(): void {
    if (!this.canApply) {
      return;
    }

    if (this.mode === 'graph') {
      const edges = this.parsedEdges ?? [];
      if (this.isWeightedGraph) {
        this.applied.emit({
          kind: 'graph',
          edges,
          start: this.startNodeText.trim(),
          end: this.endNodeText.trim(),
        });
      } else {
        this.applied.emit({ kind: 'graph', edges, start: DFS_FIXED_START });
      }
      this.reset();
      this.closed.emit();
      return;
    }

    if (this.parsedElementCount === null) {
      return;
    }
    const values = this.elementValues.slice(0, this.parsedElementCount).map(Number);

    if (this.mode === 'array-with-target') {
      this.applied.emit({ kind: 'array-with-target', values, target: Number(this.targetText) });
    } else {
      this.applied.emit({ kind: 'array', values });
    }
    this.reset();
    this.closed.emit();
  }

  protected onGenerateRandom(): void {
    const count = this.visibleFieldCount;
    this.elementValues = Array.from({ length: count }, () => String(Math.floor(Math.random() * 100)));
  }

  protected onCancel(): void {
    this.reset();
    this.closed.emit();
  }

  private reset(): void {
    this.elementCountText = '';
    this.elementValues = [];
    this.wasClampedToMax = false;
    this.targetText = '';
    this.edgesText = '';
    this.startNodeText = '';
    this.endNodeText = '';
  }
}
