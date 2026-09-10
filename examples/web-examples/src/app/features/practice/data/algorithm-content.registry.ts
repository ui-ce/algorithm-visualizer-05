import type { AlgorithmContent } from './algorithm-content.types';

// Empty on purpose — every algorithm's content is DB-backed now (see
// docs/database/schema-content.sql and algorithm-content.loader.ts's
// DYNAMIC_CONTENT_ALGORITHM_IDS). initDynamicAlgorithmContent fills
// this in at app start.
export const ALGORITHM_CONTENT: Record<string, AlgorithmContent> = {};