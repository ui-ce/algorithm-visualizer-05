import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlgoButton } from '../../design-system/button/button';
import { TextField } from '../../design-system/text-field/text-field';
import { AuthService } from '../../core/services/auth.service';
import { TestQuestionsService, type AdminQuestionRow } from '../test/data/test-questions.service';
import { LANDING_ALGORITHMS } from '../landing/landing';
import type { QuestionType, TestDifficulty, TestOption, TestQuestion } from '../test/test.types';

interface OptionDraft {
  id: string;
  text: string;
}

// Admin panel for the Test feature's question bank — add/list/edit/
// delete questions per algorithm without touching the static
// *.data.ts files or redeploying. Backed by public.test_questions (see
// docs/database/schema-questions.sql). Lives under /admin (see
// admin-shell.ts) — adminGuard on the parent route already restricts
// this to accounts with user_metadata.is_admin === true.
//
// Currently only DFS and Dijkstra are actually READ from the database
// by the rest of the app (see DYNAMIC_ALGORITHM_IDS in
// test-question-bank.ts) — questions can be entered here for any
// algorithm, but they won't show up in that algorithm's real Test flow
// until its id is added to that list and its static data is retired.
@Component({
  selector: 'algo-admin-questions',
  imports: [AlgoButton, TextField, FormsModule, CommonModule],
  templateUrl: './admin-questions.html',
  styleUrl: './admin-questions.scss',
})
export class AdminQuestionsPage implements OnInit {
  protected readonly algorithmOptions = LANDING_ALGORITHMS.map((a) => a.route);
  protected readonly difficultyOptions: TestDifficulty[] = ['easy', 'medium', 'hard'];
  protected readonly typeOptions: QuestionType[] = ['conceptual', 'execution', 'code'];

  protected algorithmId = this.algorithmOptions[0] ?? '';
  protected difficulty: TestDifficulty = 'easy';
  protected setNumber = 1;
  protected language: 'en' | 'fa' = 'en';
  protected position = 1;
  protected type: QuestionType = 'conceptual';

  protected prompt = '';
  protected explanation = '';
  protected correctOptionId = '';
  protected options: OptionDraft[] = [
    { id: 'a', text: '' },
    { id: 'b', text: '' },
  ];

  // Raw JSON for the two type-specific, deeply-nested fields
  // (TestQuestion.visualization / .codeLines) — see TestQuestion in
  // test.types.ts for their real shapes. insertExample() below fills
  // in a valid, correctly-shaped starting point; there's no bespoke
  // graph/pseudocode builder UI yet, that's real future work.
  //
  // Getting the actual VALUES right (which frameIndex really shows what
  // you mean, what the pseudocode should really say for this algorithm)
  // isn't something this form can check for you — open that
  // algorithm's own Practice page in another tab, step through it with
  // Play/Next, and copy the inputArray/graph + frameIndex from the
  // state you want. That's the one source of truth for "what actually
  // happens at frame N" — this form only validates that the JSON is
  // *shaped* correctly, not that it's *true*.
  protected visualizationJson = '';
  protected codeLinesJson = '';

  // Set by onEdit() below — while non-null, "Add question" becomes
  // "Save changes" and onSubmit() updates that row instead of
  // inserting a new one. This is also how you "replace" a question:
  // edit it, change whatever fields, save.
  protected editingId: string | null = null;

  protected existingQuestions: AdminQuestionRow[] = [];
  protected isLoadingList = false;
  protected isSubmitting = false;
  protected formError: string | null = null;
  protected formSuccess: string | null = null;

  // Which row's accordion is open in the list, if any — a row shows
  // just its prompt/type/meta collapsed; expanding it shows the full
  // options (correct one marked), explanation, and raw JSON, with no
  // need to hit Edit just to read a question.
  protected expandedId: string | null = null;

  // Browse filters for the list on the right — independent of the
  // form's own fields on the left, so you can e.g. fill in a Hard/set 3
  // question on the left while browsing Easy/set 1 on the right. This
  // is the "algorithm → difficulty → set → type" browsing flow: pick
  // the algorithm up top (reloads the list), then narrow with these.
  // 'all' skips that filter entirely.
  protected filterDifficulty: TestDifficulty | 'all' = 'all';
  protected filterSetNumber: number | 'all' = 'all';
  protected filterType: QuestionType | 'all' = 'all';
  protected filterLanguage: 'en' | 'fa' | 'all' = 'all';

  private readonly _difficultyOrder: Record<TestDifficulty, number> = { easy: 0, medium: 1, hard: 2 };

  public constructor(
    protected readonly authService: AuthService,
    private readonly _questionsService: TestQuestionsService,
  ) {}

  public ngOnInit(): void {
    void this.refreshList();
  }

  // Sorted easy → medium → hard, then by set, then by the position you
  // gave each question, so browsing "DFS, execution only" reads in the
  // same order a learner would actually hit those questions in.
  protected get filteredQuestions(): AdminQuestionRow[] {
    return this.existingQuestions
      .filter((row) => this.filterDifficulty === 'all' || row.difficulty === this.filterDifficulty)
      .filter((row) => this.filterSetNumber === 'all' || row.setNumber === this.filterSetNumber)
      .filter((row) => this.filterType === 'all' || row.question.type === this.filterType)
      .filter((row) => this.filterLanguage === 'all' || row.language === this.filterLanguage)
      .sort((a, b) => {
        if (a.difficulty !== b.difficulty) return this._difficultyOrder[a.difficulty] - this._difficultyOrder[b.difficulty];
        if (a.setNumber !== b.setNumber) return a.setNumber - b.setNumber;
        return a.position - b.position;
      });
  }

  // Distinct set numbers present for the current algorithm — drives
  // the "set" filter's options so it only ever offers sets that
  // actually exist instead of a fixed guess like "1, 2, 3".
  protected get availableSetNumbers(): number[] {
    return [...new Set(this.existingQuestions.map((row) => row.setNumber))].sort((a, b) => a - b);
  }

  protected async onAlgorithmChange(): Promise<void> {
    this.cancelEdit();
    this.filterDifficulty = 'all';
    this.filterSetNumber = 'all';
    this.filterType = 'all';
    this.filterLanguage = 'all';
    await this.refreshList();
  }

  protected toggleExpanded(row: AdminQuestionRow): void {
    this.expandedId = this.expandedId === row.id ? null : row.id;
  }

  private async refreshList(): Promise<void> {
    this.isLoadingList = true;
    this.existingQuestions = await this._questionsService.listQuestions(this.algorithmId);
    this.isLoadingList = false;
  }

  protected addOption(): void {
    const nextLetter = String.fromCharCode('a'.charCodeAt(0) + this.options.length);
    this.options = [...this.options, { id: nextLetter, text: '' }];
  }

  protected removeOption(index: number): void {
    if (this.options.length <= 2) return; // a question needs at least 2 options
    this.options = this.options.filter((_, i) => i !== index);
  }

  protected onOptionIdChange(index: number, value: string): void {
    this.options = this.options.map((opt, i) => (i === index ? { ...opt, id: value } : opt));
  }

  protected onOptionTextChange(index: number, value: string): void {
    this.options = this.options.map((opt, i) => (i === index ? { ...opt, text: value } : opt));
  }

  // Fills visualizationJson/codeLinesJson with a correctly-*shaped*
  // starting point for the current type, so you're editing real values
  // in place of a template instead of writing the JSON structure from
  // scratch. See this class's own comment above visualizationJson for
  // why the *values* here are placeholders you still need to replace
  // with the real ones from that algorithm's Practice page.
  protected insertExample(kind: 'array' | 'graph' | 'code'): void {
    if (kind === 'array') {
      this.visualizationJson = JSON.stringify({ inputArray: [5, 2, 8, 1], frameIndex: 2 }, null, 2);
    } else if (kind === 'graph') {
      this.visualizationJson = JSON.stringify(
        {
          graph: { nodes: ['A', 'B', 'C', 'D'], edges: [['A', 'B', 1], ['B', 'C', 2], ['A', 'C', 4], ['C', 'D', 1]] },
          frameIndex: 2,
          start: 'A',
          end: 'D',
        },
        null,
        2,
      );
    } else {
      this.codeLinesJson = JSON.stringify(
        [
          { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function example(arr):', kind: 'plain' }] },
          { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 1:', kind: 'plain' }] },
          { lineNumber: 3, indentLevel: 2, tokens: [{ text: '____', kind: 'blank' }] },
        ],
        null,
        2,
      );
    }
  }

  private buildQuestion(): { question: TestQuestion | null; error: string | null } {
    if (!this.prompt.trim()) return { question: null, error: 'Prompt is required.' };
    if (!this.explanation.trim()) return { question: null, error: 'Explanation is required.' };

    const options: TestOption[] = this.options
      .filter((opt) => opt.id.trim() && opt.text.trim())
      .map((opt) => ({ id: opt.id.trim(), text: opt.text.trim() }));

    if (options.length < 2) return { question: null, error: 'At least 2 options with both an id and text are required.' };
    if (!options.some((opt) => opt.id === this.correctOptionId.trim())) {
      return { question: null, error: 'correctOptionId must match one of the option ids above.' };
    }

    let visualization: TestQuestion['visualization'] | undefined;
    if (this.type === 'execution') {
      if (!this.visualizationJson.trim()) return { question: null, error: 'Visualization JSON is required for execution questions.' };
      try {
        visualization = JSON.parse(this.visualizationJson);
      } catch {
        return { question: null, error: 'Visualization JSON is not valid JSON.' };
      }
      if (typeof visualization !== 'object' || visualization === null || !('frameIndex' in visualization)) {
        return { question: null, error: 'Visualization JSON must include a numeric "frameIndex".' };
      }
      if (!('inputArray' in visualization) && !('graph' in visualization)) {
        return { question: null, error: 'Visualization JSON needs either "inputArray" (sorting/searching) or "graph" (graph algorithms).' };
      }
    }

    let codeLines: TestQuestion['codeLines'] | undefined;
    if (this.type === 'code') {
      if (!this.codeLinesJson.trim()) return { question: null, error: 'Code lines JSON is required for code questions.' };
      try {
        codeLines = JSON.parse(this.codeLinesJson);
      } catch {
        return { question: null, error: 'Code lines JSON is not valid JSON.' };
      }
      if (!Array.isArray(codeLines) || codeLines.length === 0) {
        return { question: null, error: 'Code lines JSON must be a non-empty array of {lineNumber, indentLevel, tokens}.' };
      }
      if (!codeLines.some((line) => Array.isArray(line?.tokens) && line.tokens.some((t: { kind?: string }) => t?.kind === 'blank'))) {
        return { question: null, error: 'A code question needs at least one token with kind "blank" — that\'s the fill-in-the-blank part.' };
      }
    }

    return {
      error: null,
      question: {
        id: this.editingId ?? crypto.randomUUID(),
        type: this.type,
        prompt: this.prompt.trim(),
        options,
        correctOptionId: this.correctOptionId.trim(),
        explanation: this.explanation.trim(),
        visualization,
        codeLines,
      },
    };
  }

  protected async onSubmit(): Promise<void> {
    this.formError = null;
    this.formSuccess = null;

    const { question, error } = this.buildQuestion();
    if (!question) {
      this.formError = error;
      return;
    }

    this.isSubmitting = true;
    const input = {
      algorithmId: this.algorithmId,
      difficulty: this.difficulty,
      setNumber: this.setNumber,
      language: this.language,
      position: this.position,
      question,
    };
    const result = this.editingId
      ? await this._questionsService.updateQuestion(this.editingId, input)
      : await this._questionsService.createQuestion(input);
    this.isSubmitting = false;

    if (!result.success) {
      this.formError = result.error ?? 'Could not save the question.';
      return;
    }

    this.formSuccess = this.editingId ? 'Changes saved.' : 'Question added.';
    const wasEditing = this.editingId !== null;
    this.resetQuestionFields();
    if (!wasEditing) this.position += 1; // only auto-advance position after adding a new one, not after editing
    await this.refreshList();
  }

  // Loads an existing row into the form on the left for editing — the
  // "replace/update" flow: change whatever fields need changing (even
  // the difficulty or set), then Save changes.
  protected onEdit(row: AdminQuestionRow): void {
    this.editingId = row.id;
    this.algorithmId = row.algorithmId;
    this.difficulty = row.difficulty;
    this.setNumber = row.setNumber;
    this.language = row.language;
    this.position = row.position;
    this.type = row.question.type;
    this.prompt = row.question.prompt;
    this.explanation = row.question.explanation;
    this.correctOptionId = row.question.correctOptionId;
    this.options = row.question.options.map((opt) => ({ id: opt.id, text: opt.text }));
    this.visualizationJson = row.question.visualization ? JSON.stringify(row.question.visualization, null, 2) : '';
    this.codeLinesJson = row.question.codeLines ? JSON.stringify(row.question.codeLines, null, 2) : '';
    this.formError = null;
    this.formSuccess = null;
  }

  protected cancelEdit(): void {
    this.editingId = null;
    this.resetQuestionFields();
  }

  private resetQuestionFields(): void {
    this.editingId = null;
    this.prompt = '';
    this.explanation = '';
    this.correctOptionId = '';
    this.options = [
      { id: 'a', text: '' },
      { id: 'b', text: '' },
    ];
    this.visualizationJson = '';
    this.codeLinesJson = '';
  }

  protected async onDelete(row: AdminQuestionRow): Promise<void> {
    const result = await this._questionsService.deleteQuestion(row.id);
    if (!result.success) {
      this.formError = result.error ?? 'Could not delete the question.';
      return;
    }
    if (this.editingId === row.id) this.cancelEdit();
    if (this.expandedId === row.id) this.expandedId = null;
    await this.refreshList();
  }
}