import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlgoButton } from '../../../../design-system/button/button';

const MAX_ELEMENT_COUNT = 40;
const DEFAULT_FIELD_COUNT = 10;
const FIELDS_PER_ROW = 5;

@Component({
  selector: 'algo-custom-input-modal',
  imports: [AlgoButton],
  templateUrl: './custom-input-modal.html',
  styleUrl: './custom-input-modal.scss',
})
export class CustomInputModal {
  @Input()
  public isOpen = false;

  @Output()
  public readonly closed = new EventEmitter<void>();

  @Output()
  public readonly applied = new EventEmitter<number[]>();

  protected readonly maxElementCount = MAX_ELEMENT_COUNT;

  protected elementCountText = '';
  protected elementValues: string[] = [];

  protected wasClampedToMax = false;

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
      return 'Please enter a positive whole number.';
    }
    return null;
  }

  // Shown once, right after a >40 entry gets auto-corrected to 40.
  protected get maxCountNotice(): string | null {
    return this.wasClampedToMax ? `You can enter at most ${MAX_ELEMENT_COUNT} elements — set to ${MAX_ELEMENT_COUNT}.` : null;
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

  protected get canApply(): boolean {
    const count = this.parsedElementCount;
    if (count === null) {
      return false;
    }
    return this.elementValues
      .slice(0, count)
      .every((value) => value.trim() !== '' && Number.isInteger(Number(value)));
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

  protected onApply(): void {
    if (!this.canApply || this.parsedElementCount === null) {
      return;
    }

    const values = this.elementValues.slice(0, this.parsedElementCount).map(Number);
    this.applied.emit(values);
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
  }
}
