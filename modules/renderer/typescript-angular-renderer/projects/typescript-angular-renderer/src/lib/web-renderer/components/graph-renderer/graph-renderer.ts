import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GraphState } from '../../models/framer/graph/graph-state.type';
import { GraphMetaData } from '../../models/renderer/graph/graph-metadata.type';
import { GraphLayoutName, GraphLayoutService } from './graph-layout.service';
import cytoscape, {
  Core,
  CircleLayoutOptions,
  ConcentricLayoutOptions,
  BreadthFirstLayoutOptions,
  LayoutOptions,
} from 'cytoscape';

@Component({
  selector: 'graph-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-renderer.html',
  styleUrls: ['./graph-renderer.scss'],
})
export class GraphRenderer implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input()
  public state: GraphState;

  @Input()
  public metadata: GraphMetaData;

  @Input()
  public compact = false;

  @ViewChild('cyContainer', { static: true })
  protected cyContainer: ElementRef<HTMLDivElement>;

  private readonly layoutService = inject(GraphLayoutService);

  private readonly layoutsByName: Record<GraphLayoutName, LayoutOptions> = {
    circle: { name: 'circle' } as CircleLayoutOptions,
    concentric: { name: 'concentric', minNodeSpacing: 30 } as ConcentricLayoutOptions,
    breadthfirst: { name: 'breadthfirst' } as BreadthFirstLayoutOptions,
  };




  // The Circle/Concentric/Breadth First control itself no longer lives
  // here — it used to float over the graph canvas as its own toolbar,
  // but that put it in a completely different component subtree than
  // the app's Data Structures panel, which made it impossible to stack
  // the two together in one column no matter what CSS was applied to
  // either side. It's now rendered by the consuming app (see
  // visualization-section) wherever it makes sense on the page, and
  // this component just reacts to GraphLayoutService's current value —
  // same underlying Cytoscape layout change, different place for the
  // buttons.
  private _currentLayout: LayoutOptions = this.layoutsByName.circle;
  private _isInitialized: boolean = false;
  private _cy: Core;
  private _layoutSubscription: Subscription;

  // Cytoscape measures its container once on init and then never
  // checks again — it has no idea when the surrounding page changes
  // layout (e.g. the Drawer opening/closing, which resizes this
  // column through pure CSS flex without touching this component's
  // inputs at all). Left alone, the canvas keeps rendering at its old
  // size and visually spills past its new, narrower box instead of
  // shrinking with it. Watching the container itself — not the
  // window — catches every case that actually changes its box,
  // regardless of what caused it.
  private _resizeObserver: ResizeObserver | undefined;

  public get minHeight(): string {
    return this.metadata?.minHeight ?? '400px';
  }

  public ngOnInit(): void {
    this._layoutSubscription = this.layoutService.layout$.subscribe((layoutName) => {
      this.changeLayout(this.layoutsByName[layoutName]);
    });
  }

  public ngAfterViewInit(): void {
    this.renderGraph();
    this._isInitialized = true;

    this._resizeObserver = new ResizeObserver(() => {
      // resize() alone tells Cytoscape to re-measure its canvas to the
      // container's current box; fit() then re-frames the existing
      // layout inside that new box so nodes don't end up clipped or
      // stranded off to one side once the column has shrunk or grown.
      this._cy?.resize();
      this._cy?.fit(undefined, 20);
    });
    this._resizeObserver.observe(this.cyContainer.nativeElement);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['state'] ||
        changes['metadata'] ||
        changes['compact']) &&
      this.cyContainer &&
      this._isInitialized
    ) {
      this.renderGraph();

      requestAnimationFrame(() => {
        this._cy?.resize();
        this._cy?.fit(undefined, 20);
      });
    }
  }

  public ngOnDestroy(): void {
    this._layoutSubscription?.unsubscribe();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    this._cy?.destroy();
    this._cy = undefined;
  }

  public changeLayout(layout: LayoutOptions): void {
    this._currentLayout = layout;
    if (this._cy) {
      this._cy
        .layout({ ...this._currentLayout, animate: true, animationDuration: 500 } as any)
        .run();
    }
  }

  // Cytoscape has its own internal stylesheet engine — it is NOT the
  // browser's CSS engine, so style values only ever get matched against
  // Cytoscape's own color regexes (hex/rgb/hsl/named colors). It has no
  // concept of `var(--custom-property)` and silently falls back to the
  // property's default (a flat gray) for anything it can't parse. Every
  // color this renderer receives from rendererMetadata is written as
  // `var(--color-viz-...)` (see practice.ts), so without this resolution
  // step every node/edge — regardless of highlight tag — rendered as the
  // exact same fallback color, which is why the graph never appeared to
  // visually react to the algorithm running. Resolving through
  // getComputedStyle here (real DOM, so var() works normally) turns each
  // token into the flat color Cytoscape can actually parse.
  //
  // Re-resolved on every renderGraph() call (i.e. every frame) rather
  // than cached once, so a dark/light theme toggle mid-run still picks
  // up the new resolved values immediately instead of keeping stale
  // colors from whichever theme was active on first render.
  private resolveColor(color: string | undefined): string {
    if (!color) return color as string;

    const match = color.trim().match(/^var\((--[\w-]+)\)$/);
    if (!match || !this.cyContainer) return color;

    const resolved = getComputedStyle(this.cyContainer.nativeElement).getPropertyValue(match[1]).trim();
    return resolved || color;
  }

  private renderGraph(): void {
    if (!this.state || !this.cyContainer) return;

    const nodeTagColors: Record<string, string> = {};
    this.metadata?.nodeHighlightTags?.forEach(
      (tag) => (nodeTagColors[tag.tag] = this.resolveColor(tag.color)),
    );

    const edgeTagColors: Record<string, string> = {};
    this.metadata?.edgeHighlightTags?.forEach(
      (tag) => (edgeTagColors[tag.tag] = this.resolveColor(tag.color)),
    );

    const defaultNodeColor = this.resolveColor(this.metadata?.defaultNodeColor) ?? '#ffffff';
    const defaultEdgeColor = this.resolveColor(this.metadata?.defaultEdgeColor) ?? '#000000';

    const elements = [
      ...this.state.nodes.map((n) => {
        const highlightTag = n.highlightTags.at(-1);
        return {
          data: {
            id: n.id,
            label: n.label,
            color: highlightTag
              ? (nodeTagColors[highlightTag] ?? defaultNodeColor)
              : defaultNodeColor,
          },
        };
      }),
      ...this.state.edges.map((e) => {
        const highlightTag = e.highlightTags.at(-1);
        return {
          data: {
            id: e.id,
            source: e.source,
            target: e.target,
            label: e.label,
            color: highlightTag
              ? (edgeTagColors[highlightTag] ?? defaultEdgeColor)
              : defaultEdgeColor,
            weight: parseFloat(e.label) || 1,
          },
        };
      }),
    ];

    if (!this._cy) {
      this._cy = cytoscape({
        container: this.cyContainer.nativeElement,
        elements,
        layout: this._currentLayout,
        style: [
          {
            selector: 'node',
            style: {
              width: 40,
              height: 40,
              'background-color': 'data(color)',
              label: 'data(label)',
              'text-valign': 'center',
              'text-halign': 'center',
              'border-width': 1,
              'border-color': '#000',
              color: '#000',
              'font-size': 14,
            },
          },
          {
            selector: 'edge',
            style: {
              'line-color': 'data(color)',
              'target-arrow-shape': 'triangle',
              'target-arrow-color': 'data(color)',
              'curve-style': 'bezier',
              label: 'data(label)',
              'text-background-color': '#fff',
              'text-background-opacity': 1,
              color: '#000',
              'font-size': 14,
              width: 3.5,
            },
          },
        ],
      });
      return;
    }

    this._cy.batch(() => {
      const currentIds = new Set(elements.map((element) => element.data.id));
      this._cy.elements().forEach((element) => {
        if (!currentIds.has(element.id())) {
          element.remove();

          if ((element as any)._private.group !== 'edges') {
            this._cy.layout(this._currentLayout).run();
          }
        }
      });

      for (const element of elements) {
        const existing = this._cy.getElementById(element.data.id);
        if (existing.nonempty()) {
          existing.data(element.data);
        } else {
          this._cy.add(element);

          if (!('source' in element.data)) {
            this._cy.layout(this._currentLayout).run();
          }
        }
      }
    });
  }
}
