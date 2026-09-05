/* fb40 · /js/systems/chapel.js · v0.2.0 · 2026-09-05 */
import { atomicPut, getRecord } from '../core/db.js';
import { localDateISO } from '../core/dates.js';
import { createActivityCompletion, getActivityCompletion } from '../life/activities.js';

export const FIRST_FLAME_QUEST_ID = 'chapel:first-flame';
export const FAITH_PILLAR_ID = 'faith';
export const FAITH_ACTIVITY_ID = 'quiet-hour';
export const FIRST_FLAME_XP = 10;

function defaultFaithPillar() {
  return { id: FAITH_PILLAR_ID, xp: 0, level: 1, updatedAt: null };
}

function defaultQuest() {
  return {
    id: FIRST_FLAME_QUEST_ID,
    keeperId: 'aldous',
    pillarId: FAITH_PILLAR_ID,
    state: 'available',
    acceptedAt: null,
    completedAt: null,
    rewardXp: FIRST_FLAME_XP
  };
}

function defaultChapelScene() {
  return {
    id: 'chapel',
    chapterId: 'keep',
    restorationTier: 0,
    firstFlameLitAt: null,
    updatedAt: null
  };
}

export async function loadChapelState(db, date = localDateISO()) {
  const [pillarRecord, questRecord, sceneRecord, completion] = await Promise.all([
    getRecord(db, 'pillars', FAITH_PILLAR_ID),
    getRecord(db, 'quests', FIRST_FLAME_QUEST_ID),
    getRecord(db, 'scenes', 'chapel'),
    getActivityCompletion(db, { pillarId: FAITH_PILLAR_ID, activityId: FAITH_ACTIVITY_ID, date })
  ]);
  return {
    pillar: pillarRecord ?? defaultFaithPillar(),
    quest: questRecord ?? defaultQuest(),
    scene: sceneRecord ?? defaultChapelScene(),
    completion: completion ?? null
  };
}

export async function acceptFirstFlame(db) {
  const existing = await getRecord(db, 'quests', FIRST_FLAME_QUEST_ID);
  if (existing?.state === 'complete' || existing?.state === 'accepted') return existing;
  const now = new Date().toISOString();
  const quest = { ...(existing ?? defaultQuest()), state: 'accepted', acceptedAt: now };
  await atomicPut(db, [{ store: 'quests', record: quest }]);
  return quest;
}

export async function completeFirstFlame(db, { date = localDateISO(), source = 'demo' } = {}) {
  const existingCompletion = await getActivityCompletion(db, {
    pillarId: FAITH_PILLAR_ID,
    activityId: FAITH_ACTIVITY_ID,
    date
  });
  if (existingCompletion) {
    return { duplicate: true, ...(await loadChapelState(db, date)) };
  }

  const now = new Date().toISOString();
  const [pillarRecord, questRecord, sceneRecord] = await Promise.all([
    getRecord(db, 'pillars', FAITH_PILLAR_ID),
    getRecord(db, 'quests', FIRST_FLAME_QUEST_ID),
    getRecord(db, 'scenes', 'chapel')
  ]);

  const currentPillar = pillarRecord ?? defaultFaithPillar();
  const nextXp = (currentPillar.xp ?? 0) + FIRST_FLAME_XP;
  const pillar = {
    ...currentPillar,
    xp: nextXp,
    level: Math.max(1, Math.floor(nextXp / 100) + 1),
    updatedAt: now
  };
  const quest = {
    ...(questRecord ?? defaultQuest()),
    state: 'complete',
    acceptedAt: questRecord?.acceptedAt ?? now,
    completedAt: now
  };
  const scene = {
    ...(sceneRecord ?? defaultChapelScene()),
    restorationTier: Math.max(1, sceneRecord?.restorationTier ?? 0),
    firstFlameLitAt: sceneRecord?.firstFlameLitAt ?? now,
    updatedAt: now
  };
  const completion = createActivityCompletion({
    pillarId: FAITH_PILLAR_ID,
    activityId: FAITH_ACTIVITY_ID,
    label: 'Quiet Hour',
    date,
    completedAt: now,
    source,
    metadata: { questId: FIRST_FLAME_QUEST_ID }
  });

  await atomicPut(db, [
    { store: 'logs', record: completion },
    { store: 'pillars', record: pillar },
    { store: 'quests', record: quest },
    { store: 'scenes', record: scene }
  ]);

  return { duplicate: false, pillar, quest, scene, completion };
}
