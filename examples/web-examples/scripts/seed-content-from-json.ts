// Phase 2 of the file-independent seed pipeline for algorithm content.
// Mirrors scripts/seed-questions-from-json.ts exactly. Reads the JSON
// files scripts/export-content-to-json.ts wrote to
// scripts/seed-data/content/ and upserts them into Supabase's
// public.algorithm_content table.
//
// This file never imports anything from src/app — it only reads
// JSON — so it keeps working even after the *.content.ts /
// *.content.fa.ts files are deleted, and even if you move to a brand
// new Supabase project later: just point SUPABASE_URL at the new
// project and re-run this.
//
// Re-runnable and per-algorithm: pass one or more algorithm ids as
// arguments to only seed those; with no arguments it seeds every JSON
// file found in scripts/seed-data/content/. Uses upsert on
// (algorithm_id, language), so re-running after editing a JSON file
// (or an admin edit you want to reset back to the file) just re-syncs
// it — never duplicates rows.
//
// Run from the project root (examples/web-examples), AFTER running
// export-content-to-json.ts once:
//   SUPABASE_URL=https://bzkyltrvfegwlugzsuhf.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=<service_role key, Supabase dashboard → Settings → API> \
//   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed-content-from-json.ts
//
// Or just one algorithm:
//   ...same env vars... scripts/seed-content-from-json.ts bubble-sort dijkstra
//
// The service_role key bypasses Row Level Security entirely. It is NOT
// the anon key from environment.ts — never commit it, never put it in
// the Angular app, only run this from a trusted machine.
/// <reference types="node" />
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

const SEED_DATA_DIR = path.join(__dirname, 'seed-data', 'content');

async function main() {
  const url = process.env['SUPABASE_URL'];
  const serviceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];
  if (!url || !serviceRoleKey) {
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars first — see the comment at the top of this file.');
    process.exit(1);
  }

  if (!fs.existsSync(SEED_DATA_DIR)) {
    console.error(`${SEED_DATA_DIR} does not exist — run export-content-to-json.ts first.`);
    process.exit(1);
  }

  const requestedIds = process.argv.slice(2); // e.g. ['bubble-sort', 'dijkstra']
  const supabase = createClient(url, serviceRoleKey);

  const files = fs.readdirSync(SEED_DATA_DIR).filter((f) => f.endsWith('.json'));
  let seeded = 0;

  for (const file of files) {
    // filename shape: <algorithm-id>.<en|fa>.json
    const match = file.match(/^(.+)\.(en|fa)\.json$/);
    if (!match) continue;
    const [, algorithmId, language] = match;

    if (requestedIds.length > 0 && !requestedIds.includes(algorithmId)) continue;

    const content = JSON.parse(fs.readFileSync(path.join(SEED_DATA_DIR, file), 'utf-8'));

    const { error } = await supabase.from('algorithm_content').upsert(
      {
        algorithm_id: algorithmId,
        language,
        overview: content.overview,
        intuition: content.intuition,
        how_it_works: content.howItWorks,
        key_characteristic: content.keyCharacteristic,
        overview_faq: content.overviewFaq,
        complexity: content.complexity,
        pros: content.pros,
        cons: content.cons,
        when_to_use: content.whenToUse,
        when_not_to_use: content.whenNotToUse,
        applications: content.applications,
        implementations: content.implementations,
      },
      { onConflict: 'algorithm_id,language' },
    );

    if (error) {
      console.error(`✗ ${algorithmId}/${language}: ${error.message}`);
    } else {
      console.log(`✓ ${algorithmId}/${language} seeded.`);
      seeded++;
    }
  }

  console.log(`\nDone — ${seeded} row(s) upserted into public.algorithm_content.`);
}

main();
