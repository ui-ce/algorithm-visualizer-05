// 'idle': no answer submitted yet for this question.
// 'correct-unselected'/'correct-selected': this option is the right
// answer, revealed after submission (selected or not — the right answer
// always gets the green border once feedback shows, even if the person
// didn't pick it).
// 'incorrect-selected': this is the wrong option the person picked.
export type OptionVisualState = 'idle' | 'correct' | 'incorrect-selected';
