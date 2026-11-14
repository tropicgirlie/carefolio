# Carefolio agent rules

## Care Score ownership

- Carefolio is the canonical owner of company evidence, Care Score inputs, publication status and the generated index feed.
- RemoteShe is a consumer. It must not maintain a competing score, silently restore a retired Carefolio score or reinterpret unknown evidence as a benefit.
- Use the shared versioned Care Score formula. Evidence review may change inputs; it must never manually override the computed result.

## Evidence rules

- Award points only for country- and entity-specific employer policies supported by reviewed evidence, or for a clearly labelled employee report.
- Statutory entitlements, generic wellbeing language, customer-facing services and unrelated group entities earn zero employer points.
- Keep `unknown`, `confirmed`, `employee_report` and explicit unavailability distinct. Unknown earns zero but is not presented as absence.
- Paid-leave inputs must describe employer-funded paid duration above or supplementing the legal minimum.
- A public company score must have reviewed evidence for every awarded point.
- Display employer-source coverage separately when employee-reported points are included.

## Carefolio publication workflow

1. Update `src/data/company-research.json` and the dated research log.
2. Run `node scripts/generate-carefolio-feed.mjs` and `node scripts/generate-sitemap.mjs`.
3. Run `npm run test:care-score`, `node scripts/check-company-research.mjs` and `npx vite build`.
4. Inspect material score changes, publication additions and removals before committing.
5. Commit and push only when the user explicitly requests publication.

## RemoteShe synchronization contract

- The Carefolio feed must identify both published companies and IDs that are research-pending or withdrawn from publication.
- RemoteShe must refresh the live Carefolio feed at most every five minutes and during its daily worker run.
- For a published ID, RemoteShe replaces score, scored inputs, evidence status, evidence metadata and review date with Carefolio values while preserving RemoteShe job data.
- For a research-pending or withdrawn ID, RemoteShe must clear the public Care Score and mark the record `Research pending`; it must not fall back to its bundled legacy score.
- A bundled snapshot may be used only during a genuine feed outage and must never override a newer valid Carefolio feed.
- Match records by stable company ID, never by display name.
- Reject incompatible schema or Care Score versions and retain the last valid synchronized state.
- `https://www.remoteshe.co` is the canonical RemoteShe domain. Do not introduce `remoteshe.com` links.

## Cross-project release gate

When a change affects the feed contract or RemoteShe consumption, validate both repositories before pushing:

- Carefolio: `/Users/Dublin-Osx/code/Care Index Dashboard`
- RemoteShe: `/Users/Dublin-Osx/code/RemoteShe/code/RemoteShe`

Required checks:

- Carefolio score and provenance tests pass.
- RemoteShe type checking and relevant worker tests pass.
- A published score update reaches RemoteShe.
- A Carefolio research-pending/withdrawn ID suppresses the RemoteShe fallback score.
- Job counts, job records and RemoteShe-only company fields remain intact.
- No unrelated dirty-worktree changes are committed.

