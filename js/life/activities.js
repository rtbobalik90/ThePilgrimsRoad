/* fb40 · /js/life/activities.js · v0.2.0 · 2026-09-05 */
import { getRecord } from '../core/db.js';
import { localDateISO } from '../core/dates.js';

export function activityCompletionId({ pillarId, activityId, date = localDateISO() }) {
  if (!pillarId || !activityId || !date) throw new Error('Activity completion requires pillarId, activityId, and date.');
  return `${pillarId}:${activityId}:${date}`;
}

export function createActivityCompletion({
  pillarId,
  activityId,
  label,
  date = localDateISO(),
  completedAt = new Date().toISOString(),
  source = 'user',
  metadata = {}
}) {
  return {
    id: activityCompletionId({ pillarId, activityId, date }),
    pillarId,
    activityId,
    label,
    date,
    status: 'complete',
    completedAt,
    source,
    metadata
  };
}

export async function getActivityCompletion(db, { pillarId, activityId, date = localDateISO() }) {
  return getRecord(db, 'logs', activityCompletionId({ pillarId, activityId, date }));
}
