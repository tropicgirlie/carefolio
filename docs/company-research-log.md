# Company research log

## Eurofins Ireland — 25 September 2026

Status: scope clarification needed; no additional points awarded.

The employee clarified that their organisation is Eurofins under Gilles, not
Biomnis. Research should focus on the group organisation in Ireland. Its exact
legal entity and applicable policy terms are not yet established. The existing `eurofins-ireland`
record instead links to Eurofins Food Testing Ireland. The local 21-point
result remains employee-reported and provisional: maternity 6, paternity 6,
mental health 5, learning 4. Do not present it as an independently verified
group-wide result or replace the employee's report with another entity's perks.

Sources checked:

- [Food Testing Ireland 2025 pay-gap report](https://cdnmedia.eurofins.com/european-west/media/afadqia4/gender-pay-gap-report_ie-2025.pdf): contains pay quartiles and plans to support women returning from leave. It does not establish an audited equal-pay review, public salary bands, VP-level female representation or a formal returnship. Its upper-pay-quartile proportion must not be substituted for senior leadership. No points added.
- [Biomnis Ireland Account Manager](https://jobs.smartrecruiters.com/Eurofins/744000143051708-account-manager): advertises health insurance, an EAP and higher education support at Sandyford. This is a different named entity; no benefits transferred to the current record.
- [Laboratory Technician](https://jobs.smartrecruiters.com/Eurofins/744000150947689): references UK legislation and UKAS. Its enhanced leave and cash-plan benefits cannot establish Ireland entitlements.
- [HR and L&D Administrator](https://jobs.smartrecruiters.com/Eurofins/744000137478709-hr-and-l-d-administrator): Wolverhampton role; excluded from Ireland scoring.
- Existing Food Testing location page returned 403 through the research browser. No new claims derived from it.

Integration checks:

- Live Carefolio feed returned HTTP 200, formula 1.1.0, generated 10 September 2026, Eurofins score 4 with unknown leave durations.
- Live RemoteShe Worker `/api/companies/eurofins-ireland` also returned HTTP 200 and score 4. The website host's `/api` URL is not the API endpoint; the configured Worker is `https://remoteshe-worker.luanagbc.workers.dev`.
- Executed RemoteShe's actual `getCarefolioIndex` and `applyCarefolioIndex` against the local Carefolio feed with mocked network and KV. Confirmed import changed 4 to 21, retained both 12-week leave inputs and employee-reported status. This is an integration test, not a production refresh.

Next: establish the exact Ireland legal employer and source its policy terms.
Update and publish Carefolio first, then verify RemoteShe's live Worker returns
the same score and inputs after its five-minute cache becomes eligible to refresh.
Do not separately hard-code a higher score in RemoteShe.


### Group-level follow-up — 25 September 2026

Resolved the requested research scope to Eurofins group organisation in Ireland
(not Biomnis). Kept the stable ID `eurofins-ireland` for consumer compatibility,
renamed the record to make this scope visible, and removed Food Testing links
from the active source register. Historical Food Testing findings above are not
used to score this group-staff record.

The [official 2025 ESG report](https://cdnmedia.eurofins.com/eurofins-us/media/dzxfkwto/eurofins-esg-report_fy25-final.pdf),
page 124, Table 38, reports 8% women in Senior Leadership (GOC including CEO
and Regional Business Line Leaders) for 2025, with 96% scope coverage. This
adds 2 points. The 48% across all leadership levels and 44% board figure are
not substituted for the senior-leadership signal. The governance metric is
explicitly labelled global, while the employee benefit report is Ireland-scoped.

The [2022 official group directory](https://cdnmedia.eurofins.com/corporate-eurofins/media/12158653/gd2022.pdf),
page 228, identifies Eurofins Scientific Services (Ireland) Limited as the
Ireland Group Service Centre. This is historical organisational context, not
proof of current benefit entitlements.

Updated calculated result: 23/100 (12-week maternity 6, 12-week paternity 6,
mental health 5, learning 4, group senior leadership 2). Benefit inputs remain
employee-reported. No independently sourced Ireland paid-leave durations,
formal returnship, audited equal-pay report, salary bands or additional health
benefits were established in this check. No further points awarded.

## Scheduled batch — 25 September 2026, 08:01 UTC

Six queued companies checked. Changes are LOCAL ONLY, pending publication.
No commit, push, deployment or RemoteShe changes performed. No scoring formula
changes. Unconfirmed false/null inputs remain unknown rather than established
absence. Revisit unresolved companies on or after 25 October 2026 unless new
evidence arrives.

### Medtronic (Galway) — 5/100, newly publishable locally

- https://www.medtronic.com/en-ie/our-company/careers/culture.html
- https://news.medtronic.com/paid-leave-gives-new-dad-needed-time-newsroom
- https://www.medtronic.com/en-ie/contact-us.html

Ireland/Europe careers information describes paid family care leave; the
employer newsroom explicitly confirms global eligibility and caring for older
parents. Awarded caregiver_leave=true (5 points). Galway identity checked via
employer contact page. Eligibility conditions still apply. Kept parental weeks
unknown: US durations in the newsroom article cannot be applied to Ireland.
The basic assistance/referral description does not establish an enhanced
mental-health budget. Other 15 signals remain unconfirmed; no assumption of
absence or no benefits. Replaced active source list with scoped reviewed sources.

### Webflow — two corrected inputs; remains unpublished

- https://webflow.com/company/careers

Employer states 12 paid weeks for all parents plus at least six for birthing
parents: changed maternity from 12 to 18. Explicit menopause care supports
menopause_support=true. Health cover and 20 annual therapy/coaching sessions
corroborate those existing inputs. Stored provisional calculation changes from
37 to 45. Retained auto status: financial adoption support, fertility specifics
and the pre-existing learning budget remain unresolved. Generic family planning
language does not independently establish those claims. No promotion to feed.
Caregiver community is not paid caregiver leave. All other signals unresolved.

### Zoom (USA) — source register added; remains unpublished

- https://careers.zoom.us/benefits (United States – Salaried Employees)

Confirmed health cover for full-time staff and dependents, mental health
support, and professional-development book reimbursement. Added their source
and scope notes. Paid parental leave starts after six months but duration is
not stated; existing 11/16-week inputs cannot yet be validated. Financial
family-forming help does not specify adoption or fertility details. Re-entry
coaching alone does not establish a formal returnship. Existing provisional
36-point record retained unpublished; no new score inputs awarded.

### Payroc (Ireland) — unresolved, remains zero and unpublished

- https://payroc.com/about/
- https://payroc.tech/
- https://payroc.com/wp-content/uploads/2024/04/payroc-your-benefits-UK.pdf

Technology employer page identifies Republic of Ireland employees and flexible
work. Public text mentions learning/mentoring, but no learning budget or tuition
reimbursement. Country-tab benefit details were not exposed in extracted text.
UK benefits document cannot establish Republic of Ireland terms. None of the
16 scoring signals sufficiently established for this record. No input changes.
Next evidence: Republic of Ireland technology-team benefit schedule.

### Intercom (Ireland) — unresolved country scope, remains unpublished

- https://www.intercom.com/careers (redirects to https://fin.ai/careers)

Current employer careers page lists Dublin and other offices, health cover,
counselling, up to 26 paid birthing weeks and 6–8 non-birthing weeks. It does not
resolve Ireland-specific durations and eligibility, or existing childcare and
learning-budget inputs. Do not turn the maximum or range into a confirmed
Ireland entitlement. No inputs or name changed; auto status retained. Remaining
signals not established. Next evidence: Dublin role benefits or Ireland policy.

### Typeform (Spain) — unresolved, remains unpublished

- https://www.typeform.com/careers

Current employer page confirms company and remote-team identity but only generic
benefits/career opportunities. No policy terms support the existing 12/12 paid
leave weeks, budget and health claims for Spain in the text reviewed. No changes;
auto status retained. Next evidence: Spain-specific employer benefits page or
current Spain job listing with explicit policy details.

### Validation

Regenerated feed and sitemap: 56 public records; 75 companies still queued.
`npm run test:care-score` passed. Production bundle checked with `npx vite build`.
Eurofins remains 23 with employee-report provenance preserved.

## Full dataset research table — 25 September 2026

The user explicitly expanded the task from the scheduled six-company batch to
all companies and requested a data table, with Eurofins as the original focus.
Reviewed all 131 current records against the 16 existing signals (2,096 rows).
The local workbook is `outputs/company-audit-2026-09-25/Carefolio-company-research.xlsx`.
Detailed findings and source URLs are also retained in `combined-research.json`
and the cited `audit-summary.md` / provenance sidecar in that directory.

There are 239 company/source entries and 292 source-confirmed findings,
including documented minimum components. 81 companies have a positive
source-supported subtotal; 37 have confirmed input differences. Every company
still has unresolved details. Subtotals are evidence floors, not complete
ratings. Current inputs and calculated scores were preserved for comparison;
no app inputs or formula were changed for this full audit.

Eurofins remains 23 provisional: 21 points from the user's Ireland employee
report plus 2 from global senior-leadership data. No Biomnis, Food Testing or
Portugal benefits were transferred. Payroc's Republic of Ireland browser modal
at https://payroc.tech/ confirms free Irish Life health insurance from day one,
supporting 5 points previously missed by text-only extraction. This finding is
in the local table and has not yet been applied to the app record.

The table flags scope problems and unsupported imported defaults. It distinguishes
unknowns, explicit employee-reported absences, confirmed benefits and partial
entitlements. Six-calendar-month leave is a conservative 24-week confirmed
component, not an assertion that the whole policy is exactly 24 or 26 weeks.
Sample independent source checks covered 10 companies. All 131 original scores
matched formula calculations; live spreadsheet dependency and exported-error
checks passed. `npm run test:care-score` passed.

All results from this full audit are local and pending editorial application
and publication. No commits, pushes, deployments, external messages or
RemoteShe edits were performed. Unresolved claims were researched today;
routine repeat research should wait until 25 October 2026 unless new evidence
or an explicit user request warrants another check.

## 2026-09-25 — Apply full company audit to Carefolio and RemoteShe

Applied the completed 131-company, 16-signal review from `src/data/company-research.json`. Exact source-supported findings update the scoring inputs; minimum components cannot reduce a larger unresolved entitlement. Unknown findings remain unresolved, and employee-report provenance is retained. The formula is unchanged. Company profiles now distinguish provisional scores from the partial subtotal backed by reviewed public sources.

The regenerated Carefolio feed contains 58 published companies; 73 remain pending publication. Newly supported records include Payroc Ireland (5) and Coalition Technologies (9). Eurofins Ireland remains 23, including the employee-reported 12 weeks fully paid maternity leave. The research record contains the source URLs and eligibility notes for every finding.

Exported a generated fallback snapshot for all 131 companies to RemoteShe. RemoteShe continues to read the live Carefolio feed, rejects cached feeds older than the snapshot, and displays the research qualifications. Cross-project checks passed for all 131 scores and provenance, including stale-cache rejection; Care Score regression tests, both production builds, RemoteShe type checking and domain regressions, and the Worker deployment dry run passed. Publication proceeds Carefolio first, followed by RemoteShe.
