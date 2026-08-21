import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphState } from '../../models/framer/graph/graph-state.type';
import { GraphMetaData } from '../../models/renderer/graph/graph-metadata.type';
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
export class GraphRenderer implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  public state: GraphState;

  @Input()
  public metadata: GraphMetaData;

  @ViewChild('cyContainer', { static: true })
  protected cyContainer: ElementRef<HTMLDivElement>;

  protected readonly circleLayout: CircleLayoutOptions = { name: 'circle' };
  protected readonly concentricLayout: ConcentricLayoutOptions = {
    name: 'concentric',
    minNodeSpacing: 30,
  };
  protected readonly breadthFirstLayout: BreadthFirstLayoutOptions = {
    name: 'breadthfirst',
  };
  protected readonly layoutOptions = [
    { label: 'Circle', value: this.circleLayout as LayoutOptions },
    { label: 'Concentric', value: this.concentricLayout as LayoutOptions },
    { label: 'Breadth First', value: this.breadthFirstLayout as LayoutOptions },
  ];

  // Own lightweight segmented-toggle state instead of PrimeNG's
  // p-selectbutton + ngModel — see graph-renderer.html/scss. Index-based
  // (rather than tracking the LayoutOptions object itself) so the sliding
  // thumb position can be derived the same way algo-segmented-button
  // does it in the app.
  protected selectedLayoutIndex = 0;

  private _currentLayout: LayoutOptions = this.circleLayout;
  private _isInitialized: boolean = false;
  private _cy: Core;

  public get minHeight(): string {
    return this.metadata?.minHeight ?? '400px';
  }

  protected get layoutThumbTransform(): string {
    return `translateX(calc(${this.selectedLayoutIndex} * (100% + 4px)))`;
  }

  public ngAfterViewInit(): void {
    this.renderGraph();
    this._isInitialized = true;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['state'] || changes['metadata']) && this.cyContainer && this._isInitialized) {
      this.renderGraph();
    }
  }

  public ngOnDestroy(): void {
    this._cy?.destroy();
    this._cy = undefined;
  }

  protected selectLayout(index: number): void {
    if (index === this.selectedLayoutIndex) {
      return;
    }

    this.selectedLayoutIndex = index;
    this.changeLayout(this.layoutOptions[index].value);
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
