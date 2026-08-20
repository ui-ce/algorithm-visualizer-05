import { Component, Input } from '@angular/core';
import {
  SolarCheckCircleLinear,
  SolarClockCircleLinear,
  SolarLockKeyholeMinimalisticLinear,
} from '@solar-icons/angular';
import type { SetRowState } from '../level-card/level-card.types';

// Same row shape as algo-question-status-item (number badge left, status
// icon right), but with a filled number badge instead of a dot+label,
// and three states instead of five. Kept as a separate component rather
// than reusing question-status-item because the visual language (badge
// bg/border vs dot) is different enough that forcing one component to
// cover both would need a pile of conditional inputs.
@Component({
  selector: 'algo-set-row',
  imports: [SolarCheckCircleLinear, SolarClockCircleLinear, SolarLockKeyholeMinimalisticLinear],
  templateUrl: './set-row.html',
  styleUrl: './set-row.scss',
})
export class SetRow {
  @Input()
  public setNumber = 1;

  @Input()
  public state: SetRowState = 'locked';

  // Accent color for this row's difficulty level (var(--color-quiz-easy)
  // etc.) — passed in by LevelCard rather than looked up here, so this
  // component has no knowledge of difficulty at all.
  @Input()
  public accentColorVar = 'var(--color-quiz-easy)';

  @Input()
  public disabled = false;
}
