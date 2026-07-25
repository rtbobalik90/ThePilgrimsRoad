# Phase 0 Data Contract

## IndexedDB

Database: `fb40`  
Schema version: `1`

Stores are created from the complete schema in the Design & Narrative Bible: `meta`, `days`, `logs`, `pillars`, `health`, `campaign`, `scenes`, `bosses`, `quests`, `relics`, `badges`, `reviews`, and `outbox`.

## Prologue answers

Each answer preserves the question ID, question version, exact question text, answer, answer date, and future amendment date. This prevents later copy changes from altering the meaning of an existing answer.

## Backup format

The Phase 0 backup envelope is versioned as `fb40-backup` format version `1`. Phase 0 can export and inspect. It does not commit imported data.
