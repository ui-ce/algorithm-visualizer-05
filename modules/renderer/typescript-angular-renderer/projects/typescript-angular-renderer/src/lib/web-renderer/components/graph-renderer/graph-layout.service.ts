import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type GraphLayoutName = 'circle' | 'concentric' | 'breadthfirst';

export interface GraphLayoutOption {
  label: string;
  value: GraphLayoutName;
}

export const GRAPH_LAYOUT_OPTIONS: GraphLayoutOption[] = [
  { label: 'Circle', value: 'circle' },
  { label: 'Concentric', value: 'concentric' },
  { label: 'Breadth First', value: 'breadthfirst' },
];

// Lets the Circle / Concentric / Breadth First control live *outside*
// graph-renderer (e.g. stacked above the app's own Data Structures
// panel, in a completely separate component subtree) while still
// driving graph-renderer's actual Cytoscape layout.
//
// graph-renderer previously rendered this toggle itself, floating over
// the graph canvas — but it and the Data Structures panel are siblings
// in two different component trees (one under includeTypes: ['Graph'],
// the other under includeTypes: ['Array2D', 'Chart']), so no amount of
// CSS could move a control that lives *inside* graph-renderer into the
// Data Structures column. Routing the selection through this shared,
// root-provided service lets the app render the control anywhere it
// wants while graph-renderer just reacts to whatever it's set to.
@Injectable({ providedIn: 'root' })
export class GraphLayoutService {
  private readonly layoutSubject = new BehaviorSubject<GraphLayoutName>('circle');

  public readonly layout$ = this.layoutSubject.asObservable();

  public get currentLayout(): GraphLayoutName {
    return this.layoutSubject.value;
  }

  public setLayout(layout: GraphLayoutName): void {
    this.layoutSubject.next(layout);
  }
}
