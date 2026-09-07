import { renderAndSave } from './shared/latex-export';
import { ALGORITHM_REGISTRY } from './algorithms.registry';

// `npx ts-node -r tsconfig-paths/register generate.ts` — every algorithm.
// `npx ts-node -r tsconfig-paths/register generate.ts dijkstra` — just one.
const requested = process.argv[2];
const ids = requested ? [requested] : Object.keys(ALGORITHM_REGISTRY);

for (const id of ids) {
  const entry = ALGORITHM_REGISTRY[id];
  if (!entry) {
    console.error(`Unknown algorithm id: "${id}". Known ids: ${Object.keys(ALGORITHM_REGISTRY).join(', ')}`);
    continue;
  }
  console.log(`\n--- ${id} ---`);
  const { recording, objectMetaData } = entry.build();
  renderAndSave(recording, objectMetaData, id, entry.documentName);
}
