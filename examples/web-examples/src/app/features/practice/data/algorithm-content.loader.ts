import { ALGORITHM_CONTENT } from './algorithm-content.registry';
import { ALGORITHM_CONTENT_FA } from './algorithm-content.registry.fa';
import { AlgorithmContentService } from './algorithm-content.service';

// Algorithms whose Learn/Practice content is DB-backed (see
// docs/database/schema-content.sql) instead of the static
// *.content.ts / *.content.fa.ts files in this folder. Add an
// algorithm id here once its content has been migrated in — every
// page that reads ALGORITHM_CONTENT / ALGORITHM_CONTENT_FA (Learn,
// Practice, Compare) needs no further changes when this list grows,
// same as DYNAMIC_ALGORITHM_IDS does for test questions.
//
// Start this empty and add ids one at a time as you seed each
// algorithm (see scripts/seed-content-from-json.ts) and verify it in
// the browser console — don't flip every algorithm on at once.
export const DYNAMIC_CONTENT_ALGORITHM_IDS: string[] = [
  'bubble-sort',
  'binary-search',
  'linear-search',
  'merge-sort',
  'quick-sort',
  'selection-sort',
  'insertion-sort',
  'dijkstra',
  'dfs',
  'bfs',
  'a-star',
];

// Called once at app start (see the APP_INITIALIZER in app.config.ts).
// For each DB-backed algorithm, replaces its entry in
// ALGORITHM_CONTENT / ALGORITHM_CONTENT_FA with what's actually in the
// database — mutating the same objects Learn/Practice/Compare already
// import, so those files stay plain synchronous lookups and need no
// changes. If a fetch fails or the table has no row yet for that
// algorithm+language (e.g. schema-content.sql hasn't been run yet, or
// it hasn't been seeded), that algorithm's static content is left
// exactly as it was — this can never make a previously-working page
// go blank.
export async function initDynamicAlgorithmContent(): Promise<void> {
  const service = new AlgorithmContentService();

  await Promise.all(
    DYNAMIC_CONTENT_ALGORITHM_IDS.map(async (algorithmId) => {
      const [en, fa] = await Promise.all([
        service.fetchContent(algorithmId, 'en'),
        service.fetchContent(algorithmId, 'fa'),
      ]);

      // Same loud/unmissable console signal as
      // initDynamicQuestionBank — check DevTools → Console after
      // reload to confirm content actually came from Supabase this
      // run rather than falling back to the static file.
      if (en) {
        ALGORITHM_CONTENT[algorithmId] = en;
        console.info(`[algorithm-content] ✅ ${algorithmId}/en loaded from Supabase.`);
      } else {
        console.warn(`[algorithm-content] ⚠️ ${algorithmId}/en: Supabase fetch returned nothing — using static fallback, if any.`);
      }

      if (fa) {
        ALGORITHM_CONTENT_FA[algorithmId] = fa;
        console.info(`[algorithm-content] ✅ ${algorithmId}/fa loaded from Supabase.`);
      } else {
        console.warn(`[algorithm-content] ⚠️ ${algorithmId}/fa: Supabase fetch returned nothing — using static fallback, if any.`);
      }
    }),
  );
}
