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
