import { Component, Input } from '@angular/core';
import {
  SolarCheckCircleLinear,
  SolarCloseCircleLinear,
  SolarRewindForwardCircleBroken,
} from '@solar-icons/angular';
import { QUESTION_STATUS_VISUALS, type QuestionSidebarState } from './question-status-item.types';

// Left-column list item: "Question N" + a dot that carries the state
// color, plus (for correct/skipped/incorrect) a right-aligned icon.
// Fixed width comes from the parent list (162px, per spec) — this
// component itself just fills whatever width it's given.
@Component({
  selector: 'algo-question-status-item',
  imports: [SolarCheckCircleLinear, SolarCloseCircleLinear, SolarRewindForwardCircleBroken],
  templateUrl: './question-status-item.html',
  styleUrl: './question-status-item.scss',
})
export class QuestionStatusItem {
  @Input()
  public label = '';

  @Input()
  public state: QuestionSidebarState = 'locked';

  protected get visual() {
    return QUESTION_STATUS_VISUALS[this.state];
  }
}
