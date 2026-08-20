import { Component, Input } from '@angular/core';

@Component({
  selector: 'algo-test-progress',
  imports: [],
  templateUrl: './test-progress.html',
  styleUrl: './test-progress.scss',
})
export class TestProgress {
  @Input()
  public current = 1;

  @Input()
  public total = 1;

  protected get percent(): number {
    if (this.total <= 0) return 0;
    return Math.min(100, Math.round((this.current / this.total) * 100));
  }
}
