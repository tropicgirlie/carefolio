
  # Care Index Dashboard

  This is a code bundle for Care Index Dashboard. The original project is available at https://www.figma.com/design/f36sFarI1tLvsKL3woPbLs/Care-Index-Dashboard.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Care Score → RemoteShe

Carefolio publishes `public/carefolio-index-feed.json` from its company inputs
and the versioned formula in `src/lib/care-score`. RemoteShe reads that feed
from `https://www.carefolio.io/carefolio-index-feed.json`, refreshing its cache
after five minutes and retaining the last valid feed on fetch failure.
It recomputes scores using its copy of the same formula.

Care Score v1.1.0 is `round(sum(earned signal points) / 100 * 100)`:
16 signals, 100 available points. Unknown inputs earn zero and stored legacy
scores cannot override the calculation. Evidence review metadata is separate
from the numerical score; the formula itself does not verify source URLs.

Use `npm run build` for production, including Vercel. Its prebuild step
regenerates the feed and rejects stale records, duplicate IDs, version
mismatches, or incorrect scores before Vite copies it into the build.
Running `vite build` directly skips these publishing checks.

Run `npm run test:care-score` to check the feed and numerical thresholds.
Before releasing formula changes, also compare the consumer and canonical
package by passing their TypeScript entry points:

```sh
npm run test:care-score -- /path/to/RemoteShe/src/lib/careScore.ts /path/to/care-score/src/index.ts
```

The cross-project check compares versions, tiers and full signal breakdowns
for every exported company and numeric threshold fixture. Deploy formula
changes to both products together; local checks do not update either live site.

