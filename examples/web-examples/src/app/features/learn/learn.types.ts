export type DrawerSectionId = 'overview' | 'usage' | 'pros-cons';

// One entry per headline in the Learn page's table of contents (see
// AlgoLearnToc) — `id` matches the `id` attribute of the <section> it
// jump-scrolls to in learn.html.
export interface LearnTocEntry {
  id: DrawerSectionId;
  label: string;
}
