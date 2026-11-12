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

## Scheduled batch — 25 October 2026

Repeated research for the first six unpublished companies after the 30-day wait. Changes are LOCAL ONLY, pending publication. No commit, push, deployment or RemoteShe changes performed. The Care Score formula is unchanged, and unknown benefits remain unresolved rather than being treated as absence. Revisit unresolved claims on or after 24 November 2026 unless new evidence arrives.

### Webflow — 45/100 provisional; one additional scored input verified

- https://webflow.com/company/careers
- https://webflow.com/company/careers/faq

Current employer pages reconfirm 12 paid weeks for all parents plus at least six additional paid weeks for birthing parents, menopause care, health cover and mental-health sessions. The current FAQ now explicitly states that Webflow offers learning stipends, confirming the existing learning-budget input. Financial adoption assistance and broader fertility details remain unresolved. The calculated score is unchanged because the input was already present; source-supported subtotal increases by 4 points. Remains unpublished while other awarded inputs lack sufficiently specific support.

### Intercom / Fin (Ireland) — 37/100 provisional; unresolved

- https://fin.ai/careers

The current page still identifies Dublin and lists global health cover, counselling, up to 26 fully paid weeks for birthing parents and 6–8 for non-birthing parents. It does not allocate exact durations or the existing childcare and learning claims to Ireland. No score inputs changed; remains unpublished.

### Zoom (USA) — 36/100 provisional; two additional scored inputs verified

- https://www.careers.zoom.us/benefits
- https://www.careers.zoom.us/united-states-salary

Zoom now explicitly describes financial assistance for fertility services and adoption through its family-forming benefit, confirming those existing inputs. US medical cover and professional-development book reimbursement remain confirmed. Exact US parental-leave durations are still not published. The score is unchanged because these inputs were already present; source-supported subtotal increases by 11 points. Remains unpublished.

### Typeform (Spain) — 26/100 provisional; current terms unresolved

- https://www.typeform.com/careers
- https://public-assets.typeform.com/public/terms-and-conditions/2022-einf-en.pdf

The current careers page remains generic. Typeform's official 2022 report documents a historical global policy of up to 12 fully paid weeks for primary and secondary caregivers and mental-health resources, but no current policy terms were found. Historical terms were not promoted to current verified inputs. Spain eligibility and the existing learning-budget claim remain unresolved; no score inputs changed.

### Squarespace (USA) — 47/100 provisional; unresolved details

- https://www.squarespace.com/about/careers

The current employer page reconfirms health cover, up to 20 weeks paid family leave or local equivalent, fertility and adoption benefits, and behavioral-health programs. It does not establish 20 weeks for each parent, financial adoption terms, broader fertility details, paid caregiver leave, or a learning budget. No score inputs changed; remains unpublished.

### Autodesk (USA) — 49/100 provisional; current terms reconfirmed

- https://benefits.autodesk.com/document/6
- https://benefits.autodesk.com/everyday-living/family-support
- https://benefits.autodesk.com/enrolling/benefits-for-your-lifes-journey

Current 2026 US sources reconfirm six paid parental weeks, infertility-related services, up to $10,000 annual reimbursement for eligible adoption and fertility-preservation expenses, and Parentaly leave-transition coaching. IVF-specific medical coverage was not explicit, and leave-transition coaching does not meet the formula's professional-returnship definition. Existing confirmed components remain; no score inputs changed and the record remains unpublished.

## Scheduled batch — 26 October 2026

Repeated research for the next six unpublished companies after the 30-day wait. Changes are LOCAL ONLY, pending publication. No commit, push, deployment or RemoteShe changes performed. The formula is unchanged, and unknown benefits remain unresolved rather than being treated as absence. Revisit unresolved claims on or after 25 November 2026 unless new evidence arrives.

### Experian (Ireland) — 55/100 provisional; two additional inputs verified

- https://www.experian.com/careers/locations-teams/uk---ireland
- https://www.experian.com/diversity/our-people/

The current official UK & Ireland page reconfirms 26 fully paid maternity weeks, 12 fully paid secondary-caregiver weeks and private medical insurance. It also explicitly includes fertility treatment, an EAP and mental-health support; the global wellbeing page states free counselling. These confirm the existing broader-fertility and mental-health inputs. IVF procedures, caregiver leave, a formal returnship, audited pay reporting and a learning budget remain unresolved for Ireland. Calculated score remains 55 because the inputs were already present; source-supported subtotal increases by 11 points. Remains unpublished.

### Equinix (USA) — 35/100 provisional; unresolved

- https://careers.equinix.com/employee-experience-community-impact-and-our-wellbeing
- https://careers.equinix.com/jobs/total-rewards-intermediate-dallas-texas-united-states

Current employer pages reconfirm US health-plan eligibility, an EAP, global medical plans and tuition reimbursement. They do not establish the existing 8/8 paid leave durations, subsidized childcare, financial adoption support or enhanced mental-health spending for US employees. No inputs changed; remains unpublished.

### Liberty Mutual (USA) — 49/100 provisional; fertility support verified

- https://jobs.libertymutualgroup.com/life-at-liberty/benefits/

The current benefits page reconfirms 16 fully paid birth-parent weeks, 8 paid bonding weeks, up to $40,000 adoption reimbursement, 12 free therapy sessions, comprehensive health benefits and tuition reimbursement. It also states up to $50,000 for fertility medical costs and $25,000 for pharmacy costs, confirming broader fertility support; IVF is not named explicitly. Score is unchanged because the input was already present. Remains unpublished pending resolution of IVF and other signals.

### Contentful (Germany) — 40/100 provisional; country scope unresolved

- https://www.contentful.com/careers/

The current global careers page includes Berlin and reconfirms annual learning budgets plus generic mental-health resources. A US job advert describes a family-building wallet, but it was not transferred to Germany. Existing German leave, fertility, adoption, health and enhanced mental-health inputs remain unresolved. No score inputs changed; remains unpublished.

### Kyndryl (USA) — 27/100 provisional; paid-leave floor and health verified

- https://www.kyndryl.com/content/dam/kyndrylprogram/doc/en/2024/corporate-citizenship-report.pdf
- https://www.kyndryl.com/us/en/careers

Employer reporting confirms a global minimum of 20 paid parental-leave days and health-plan access in leading markets. Four weeks are recorded only as a minimum component for each parent; this does not replace or verify the existing 17-week US maternity claim. Current US careers describes extensive course access but not an annual budget or tuition reimbursement. The calculated score remains 27; source-supported floor increases to 12 points. Remains unpublished.

### Oscar Health (USA) — 67/100 provisional; current terms reconfirmed

- https://ir.oscarhealth.com/sec-filings/all-sec-filings/content/0001568651-26-000011/oscr-20251231.htm
- https://oscarhealth.com/careers
- https://s27.q4cdn.com/943936911/files/doc_downloads/2025/04/Oscar-Health-2024-Impact-Report.pdf

Current 2026 employer reporting and careers pages reconfirm comprehensive benefits, fertility and family-building support, mental-health care, paid leave for full-time employees and 10+ parental weeks. Public salary ranges and earlier detailed family-building evidence remain recorded. Subsidized childcare, a professional returnship and a learning budget were not newly established. No score inputs changed; remains unpublished.

## Scheduled batch — 27 October 2026

Repeated research for the next six unpublished companies after the 30-day wait. Changes are LOCAL ONLY, pending publication. No commit, push, deployment or RemoteShe changes performed. The formula is unchanged, and unknown benefits remain unresolved rather than being treated as absence. Revisit unresolved claims on or after 26 November 2026 unless new evidence arrives.

### Samsara (USA) — 55/100 provisional; fertility support verified

- https://www.samsara.com/company/careers/benefits
- https://www.samsara.com/pdf/docs/impact-report-2024.pdf

The current US benefits page reconfirms health cover, family-planning resources, parental leave, extended mental-health support and reimbursements. Employer reporting identifies Carrot fertility and family-forming care, confirming broader fertility support. Current paid-leave durations and financial adoption or childcare terms remain unresolved. Score is unchanged because the fertility input was already present; remains unpublished.

### Linear (USA) — 26/100 provisional; health coverage verified

- https://linear.app/careers/62a4524c-75da-499e-b150-7f68ce9f2da3

A current North America-eligible role reconfirms four months of paid parental leave and country-based health coverage. Sixteen weeks remains a conservative minimum for the four-month wording. Health cover is now source-supported; the existing learning-budget input and other care signals remain unresolved. Score remains 26 and unpublished.

### Pipedrive (Estonia) — 24/100 provisional; mental-health support verified

- https://www.pipedrive.com/en/jobs/tallinn
- https://www.pipedrive.com/en/newsroom/pipedrive-awarded-mental-health-employer-laber-by-peaasi

The Tallinn page confirms the Estonia entity. A 2025 employer announcement states that certified in-house coaching is available globally to all Pipedrivers, supplemented by local health-insurance and EAP partners. This confirms enhanced mental-health support. Leave durations, comprehensive Estonia insurance and a learning budget remain unresolved. Score is unchanged and unpublished.

### Remote (Netherlands) — 48/100 provisional; mental-health support verified

- https://apply.remote.com/jobs/8c670373-d25c-4f71-8a78-52d95974f604
- https://remote.com/careers

Current employer sources reconfirm 16 paid parental weeks, learning and wellness budgets, mental-health support services and public salary bands for all Remoters. Mental-health support is now source-supported. Netherlands-specific health, fertility and paid caregiver-leave terms remain unresolved. Score is unchanged and unpublished.

### Allstate (USA) — 36/100, newly publishable locally

- https://www.allstate.jobs/job/23280915/virtual-triage-obvious-total-loss-adjuster/
- https://delivery.contenthub.allstate.com/api/public/content/2023-sustainability-report?v=67b36ebf

Current employer sources support every awarded point: 12 paid birth-parent weeks including disability, 6 paid parental weeks, a 10% childcare tuition discount, up to $5,000 adoption reimbursement, comprehensive health cover, six funded therapy sessions and up to $5,250 tuition assistance. Exact employer identity, US scope and eligibility were reviewed. Marked verified and added to the local public feed at 36/100. This is pending publication.

### Applied Materials (USA) — corrected to 50/100 provisional

- https://www.appliedmaterials.com/us/en/careers/life-at-applied.html
- https://www.appliedmaterials.com/content/dam/site/company/csr/doc/2023_Sustainability_F.pdf.coredownload.inline.pdf
- https://www.appliedmaterials.com/us/en/careers/students-early-career.html

Employer reporting confirms 12 weeks of 100% paid US Family Care Leave for newborn, adopted or foster children and for spouses, partners and extended family. It also confirms up to $10,000 adoption or surrogacy reimbursement and 50% reimbursement on up to $1,000 of family wellbeing expenses. Added caregiver leave and adoption support, corrected other-parent leave to 12 weeks, and retained 12 weeks only as a minimum birth-parent component. The calculated score rises from 38 to 50. Fertility specifics, exact VP-level representation and other signals remain unresolved, so the record stays unpublished.

## Scheduled batch — 28 October 2026

Repeated research for the next six unpublished companies after the 30-day wait. Changes are LOCAL ONLY, pending publication. No commit, push, deployment or RemoteShe changes performed. The formula is unchanged, and unknown benefits remain unresolved rather than being treated as absence. Revisit unresolved claims on or after 27 November 2026 unless new evidence arrives.

### Broadridge (USA) — 30/100 provisional; learning budget verified

- https://www.broadridge.com/about/sustainability/people-and-communities

The current employer page reconfirms nine paid new-parent weeks, subsidised backup care, health cover and counselling. It also states that eligible regular full-time US associates can receive up to $5,250 yearly in tuition reimbursement, confirming the existing learning-budget input. The score is unchanged and the record remains unpublished.

### Ensono (USA) — 41/100 provisional; fertility support newly verified

- https://www.ensono.com/careers/principal-project-manager/
- https://www.ensono.com/wp-content/uploads/2024/04/Ensono-ESG-Apr-2024.pdf

A current US role lists a Family Forming Benefit with fertility coverage and adoption or surrogacy reimbursement, three health-plan options, education reimbursement and a public salary band. Broader fertility support is now confirmed; IVF is not named. Paid childbearing and paternal leave are listed without durations. The calculated score rises from 36 to 41; the record remains unpublished.

### Forcepoint (USA) — 24/100 provisional; unresolved

- https://www.forcepoint.com/company/work-with-us

The current global benefits page reconfirms tuition assistance up to $5,250 after eligibility requirements and a confidential TELUS Health EAP. The EAP does not publish funded therapy sessions under the Care Score rule. US paid-leave durations and other family benefits remain unresolved; no score input changed.

### GE Vernova (USA) — 46/100 provisional; current benefits reconfirmed

- https://careers.gevernova.com/environmental-leader/job/R5053973

A current US role reconfirms comprehensive health cover, confidential EAP counselling, tuition assistance, adoption assistance and paid parental leave. The page does not publish leave durations or financial adoption terms, so those inputs remain unresolved. Existing health and learning inputs are source-supported; no score input changed.

### Henry Schein (USA) — 24/100 provisional; unresolved

- https://henryschein.wd1.myworkdayjobs.com/en-US/External_Careers/job/US-Manager--Sales-Training_R134024
- https://www.henryschein.com/us-en/images/corporate/2023CSRReport.pdf

Employer reporting confirms parental-leave availability, an EAP and a family-building programme, while the current role confirms medical cover. Exact paid durations, fertility-treatment funding and current detailed eligibility are not published. No score input changed.

### Hitachi Energy (Sweden) — 37/100 provisional; current scope reconfirmed

- https://www.hitachienergy.com/se/sv/careers/open-jobs/details/JID3-221721

A current regular full-time Ludvika role reconfirms health insurance, psychological support, supplementary parental compensation and employee-development training. It does not state the paid duration, funded therapy sessions or an annual learning budget. No score input changed; remains unpublished.

## Scheduled batch — 29 October 2026

Repeated research for six unpublished companies after the 30-day wait. Changes are LOCAL ONLY, pending publication. No commit, push, deployment or RemoteShe changes performed. The formula is unchanged, and unknown benefits remain unresolved rather than being treated as absence. Revisit unresolved claims on or after 28 November 2026 unless new evidence arrives.

### Motive (KeepTruckin) (USA) — 24/100 provisional; current benefits reconfirmed

- https://gomotive.com/company/careers/
- https://gomotive.com/wp-content/uploads/2023/12/Motive-2023-Impact-Report.pdf

The current careers page reconfirms US health insurance, free mental-health support and enhanced parental leave. Historical employer reporting describes 12 therapy or coaching sessions, supporting the existing mental-health input, but current leave durations remain unpublished. Development academies do not establish an individual learning budget. No score input changed.

### Labcorp (USA) — 44/100 provisional; unresolved family terms

- https://careers.labcorp.com/global/en/us-rewards-and-wellness
- https://careers.labcorp.com/global/en/job/COVAGLOBAL2617468EXTERNALENGLOBAL/Employee-Relations-Partner

Current US employer pages reconfirm medical coverage, tuition reimbursement, wellness coaching, an EAP and adoption assistance. They do not publish paid-parental durations, adoption reimbursement terms or fertility-treatment coverage. Existing health and learning inputs remain supported; no score input changed.

### TELUS Digital (Canada) — 47/100 provisional; country scope unresolved

- https://www.telusdigital.com/careers
- https://careers.telusdigital.com/search/jobs/in/country/canada

Current careers pages identify Canadian roles but do not publish a Canada-specific employee benefit schedule. Parent TELUS policies and historical global programmes were not transferred to the TELUS Digital Canada record. No score input changed.

### The Muse (USA) — 26/100 provisional; employer benefits unavailable

- https://www.themuse.com/careers
- https://themuse.zohodesk.com/portal/en/kb/articles/i-want-to-work-at-the-muse-how-do-i-apply

The employer careers URL remains unavailable. The Muse pages surfaced in search describe benefits offered by client companies rather than benefits for The Muse employees, so they were not used. No score input changed.

### ANGEHEUERT GmbH (Germany) — 15/100 provisional; entity scope unresolved

- https://angeheuert.com/
- https://jobs.angeheuert.com/jobportal/senior-manager-supply-chain-management-operations-wien

Current vacancies describe client employers and their benefits. Those claims cannot establish benefits for the recruiting company’s own employees. All scored signals remain unresolved and no input changed.

### AOE Solutions GmbH (Germany) — 24/100 provisional; learning budget reconfirmed

- https://jobs.aoe.com/de/faq
- https://jobs.aoe.com/de/job-listings/2054510

Current AOE Solutions pages reconfirm a €2,000 annual personal development budget. A current role also names OpenUp within a broader physical and mental health package, but does not describe funded therapy sessions or an allowance, so enhanced mental-health support remains unresolved. No score input changed.

## Scheduled batch — 30 October 2026

Repeated research for six unpublished companies after the 30-day wait. Changes are LOCAL ONLY, pending publication. No commit, push, deployment or RemoteShe changes performed. The formula is unchanged, and unknown benefits remain unresolved rather than being treated as absence. Revisit unresolved claims on or after 29 November 2026 unless new evidence arrives.

### BBHT Beratungsgesellschaft (Germany) — 15/100 provisional; unresolved

- https://www.bbht.de/karriere/bbht-als-arbeitgeber
- https://www.bbht.de/karriere/karriereweg-weiterbildung

Current employer pages reconfirm structured training, mentoring, coaching, fitness and pension benefits. They do not publish an annual individual learning allowance, comprehensive employer medical plan or employer-funded family-leave duration. No score input changed.

### Bikeleasing-Service (Germany) — 19/100 provisional; unresolved

- https://bikeleasing.de/karriere
- https://support.bikeleasing.de/hc/de/articles/36634089379474-Was-passiert-bei-Elternzeit-oder-Mutterschutz

The current careers page reconfirms subsidised fitness, flexible work and individually selected training, without a published annual learning budget. Separate parental-leave information covers the bicycle-leasing insurance product used by client employers and employees; it is not a Bikeleasing employee benefit and was not scored. No score input changed.

### Caspar Health (Germany) — 19/100 provisional; learning budget reconfirmed

- https://www.caspar-health.de/en/karriere
- https://goreha.jobs.personio.com/job/2566098

Current careers and permanent-employee role pages reconfirm a budget for learning, conferences and coaching. Free access to Caspar digital programmes covers movement, nutrition and mental strength but does not establish funded clinical therapy sessions. The existing learning input remains supported; no score input changed.

### CUJU / ROGON Technologies (Germany) — 15/100 provisional; no benefit schedule

- https://cuju.pro/
- https://cuju.pro/imprint

Current product and legal pages confirm the German operating company but provide no employee benefit schedule. Product services were not treated as employee benefits. No score input changed.

### DatAds (Germany) — 15/100 provisional; no benefit schedule

- https://www.datads.io/
- https://www.datads.io/datenschutz

Current product, help and legal pages do not publish an employer careers or benefit schedule. Product claims and generic professional-growth language were not scored. No score input changed.

### easybill (Germany) — 19/100 provisional; learning budget reconfirmed

- https://www.easybill.de/jobs/

The current careers page reconfirms a professional-development budget, remote-first work and 30 vacation days. It does not publish employer-funded family leave, comprehensive employer medical insurance or enhanced mental-health support. The existing learning input remains supported; no score input changed.

## Scheduled batch — 4 November 2026

Repeated research for six unpublished companies after the 30-day wait. Changes are LOCAL ONLY, pending publication. No commit, push, deployment or RemoteShe changes performed. The formula is unchanged, and unknown benefits remain unresolved rather than being treated as absence. Revisit unresolved claims on or after 4 December 2026 unless new evidence arrives.

### ecophil GmbH (Germany) — 15/100 provisional; no benefit schedule

- https://join.com/companies/eco-philde

The current employer profile identifies the small German cleaning-products company and lists remote work only. There are no current openings or qualifying care disclosures. No score input changed.

### Ecoturn GmbH (Germany) — 15/100 provisional; unresolved

- https://join.com/companies/elektrovorteil/16711259-sales-manager-remote-m-w-d

A current full-time Germany role lists flexible hours, remote work, training and career-development opportunities. It does not specify an annual development budget, employer-funded family leave, health cover or other qualifying care terms. No score input changed.

### EffiNova GmbH (Germany) — 15/100 provisional; no benefit schedule

- https://effi-nova.de/

The current primary website confirms the energy-consulting entity but provides no careers or employee benefit schedule. No score input changed.

### FameGrowth (Germany) — 15/100 provisional; unresolved

- https://join.com/companies/famegrowth/16576102-ai-automation-und-content-operator-m-w-d

A current employer-supplied advert lists flexible hours, remote work and development opportunities. It publishes no annual learning allowance or qualifying family-health benefit. No score input changed.

### Genossenschaftsverband Bayern e.V. (Germany) — 19/100 provisional; learning support reconfirmed

- https://www.gv-bayern.de/karriere.html

The current employer page reconfirms financial support and paid release for auditor qualifications, supporting the existing learning input. It also lists supplementary health insurance, tutoring subsidies and family-care organising advice; these do not establish comprehensive medical insurance or subsidised childcare under the Care Score rules. No score input changed.

### HOPn UG (Germany) — 15/100 provisional; internship evidence excluded

- https://join.com/companies/hopneu/16021750-ai-and-machine-learning-internship

The reviewed advert is archived and covers an internship. Current linked openings are also internships, so they cannot establish a general employee benefit policy. No score input changed.

## Scheduled batch — 5 November 2026

Repeated research for six unpublished companies after the 30-day wait. Changes are LOCAL ONLY, pending publication. No commit, push, deployment or RemoteShe changes performed. The formula is unchanged, and unknown benefits remain unresolved rather than being treated as absence. Revisit unresolved claims on or after 5 December 2026 unless new evidence arrives.

### hurra.com (Germany) — 15/100 provisional; unresolved learning terms

- https://www.hurra.com/de/karriere

The current employer page reconfirms supported events, workshops, webinars and learning platforms plus fitness and pension benefits. It does not publish an annual personal allowance, tuition reimbursement or qualifying family-health terms. No score input changed.

### ideenKiND GmbH (Germany) — 15/100 provisional; internship scope

- https://join.com/companies/ideenkind

The current employer profile lists career training, equipment, flexible hours and remote work. Its two current openings are internships, and no annual learning allowance or family-health terms are published. No score input changed.

### Interius Solutions GmbH (Germany) — 15/100 provisional; no benefit schedule

- https://www.interius.io/imprint
- https://join.com/companies/interius-solutions

Current sources confirm the German legal entity and remote-flexible work but publish no qualifying employee care benefit schedule. No score input changed.

### IT42morrow IFT GmbH (Germany) — 15/100 provisional; learning terms unresolved

- https://www.it42morrow.de/karriere/
- https://join.com/companies/it42morrow/16881892-devops-engineer-m-w-d

Current employer pages promise investment in certifications, training and conferences through an individual development plan. They do not state an annual allowance or tuition-reimbursement entitlement, so the learning-budget signal remains unresolved. No score input changed.

### ITconfig/all GmbH (Germany) — 15/100 provisional; source unavailable

- https://itconfigall.eu/karriere/

The employer careers page was unavailable during this review. Previously recorded qualification support does not specify an annual allowance or tuition reimbursement, and no new qualifying care evidence was found. No score input changed.

### Kiwimo-Product GmbH (Germany) — 15/100 provisional; internship scope

- https://www.kiwimo.com/karriere

The current Bonn careers page primarily advertises mandatory internships and provides no general employee benefit schedule. Kiwimo’s product features for measuring workforce mental health were not treated as benefits for its own employees. No score input changed.

## Scheduled batch — 11 November 2026

Repeated research for six unpublished companies after the 30-day wait. Changes are LOCAL ONLY, pending publication. No commit, push, deployment or RemoteShe changes performed. The formula is unchanged, and unknown benefits remain unresolved rather than being treated as absence. Revisit unresolved claims on or after 11 December 2026 unless new evidence arrives.

### Lohnklar UG (Germany) — 15/100 provisional; development budget remains unresolved

- https://lohnklar.de/karriere

The current employer page lists 33 days' leave, a €50 monthly benefit card, flexible remote work and a personal budget for seminars, certificates and conferences. It does not define the budget amount or renewal period, and publishes no qualifying care-policy entitlement or numeric salary band. No score input changed.

### NaturGEG Vital GmbH (Germany) — 15/100 provisional; freelance evidence excluded

- https://join.com/companies/naturgegvitalde
- https://www.naturgegvital.de/pages/kontakt

The current company site confirms the German supplements business. The only located employer assignment remains freelance, so it cannot establish benefits for regular employees; no qualifying care policy was found. No score input changed.

### neoBIM GmbH (Germany) — 15/100 provisional; no scored benefit schedule

- https://join.com/companies/craft-aec-karriere
- https://join.com/companies/craft-aec-karriere/16896698-founder-associate-m-w-d-bauingenieurwesen-architektur-aec-flexibel-hybrid-naechste-generation-von-ai-tools

Current employee listings disclose flexible hours, remote work and equipment. They do not publish employer-funded family leave, health coverage, a defined annual learning allowance or another qualifying Care Score policy. No score input changed.

### Neurawork GmbH & Co. KG (Germany) — 15/100 provisional; entity resolved

- https://neurawork.ai/karriere
- https://neurawork.ai/unternehmen

The current company factsheet resolves the entity as Neurawork GmbH & Co. KG in Ampfing. Its careers page describes funded conference attendance and professional coaching, but not an employee-controlled annual allowance or tuition-reimbursement entitlement; no other qualifying care policy was found. No score input changed.

### OnlineVision (Germany) — 15/100 provisional; no benefit schedule

- https://join.com/companies/online-visioneu
- https://www.online-vision.eu/

Current sources confirm the Potsdam web and SEO agency. Generic training and mentoring do not establish a funded annual learning allowance, and no family-health benefit policy is published. No score input changed.

### Parto Group GmbH (Germany) — 21/100 provisional; pay transparency reconfirmed

- https://join.com/companies/gopartocom
- https://join.com/companies/gopartocom/16201009-senior-software-engineer-full-stack
- https://www.goparto.com/karriere

Current German employer listings continue to display role salary ranges, reconfirming the existing pay-transparency input. General workplace benefits and Parto's care-sector product do not establish additional employee care entitlements. No score input changed.

## Scheduled batch — 12 November 2026

Repeated research for six unpublished companies after the 30-day wait. Changes are LOCAL ONLY, pending publication. No commit, push, deployment or RemoteShe changes performed. The formula is unchanged, and unknown benefits remain unresolved rather than being treated as absence. Revisit unresolved claims on or after 12 December 2026 unless new evidence arrives.

### Priesmeier & Bartsch GbR / SiPRi (Germany) — 15/100 provisional; freelance evidence excluded

- https://sipri-online.de/pages/impressum
- https://sipri-online.de/pages/wer-wir-sind
- https://join.com/companies/sipri-onlinede/16717008-performance-video-editor-cutter-m-w-d-direct-response-und-meta-ads-oder-freelance

Company-owned pages confirm Priesmeier & Bartsch GbR as the Braunschweig entity behind SiPRi. The located role remains freelance and therefore cannot establish benefits for regular employees. No score input changed.

### Simple First Consulting GmbH (Germany) — 21/100 provisional; corrected from 15

- https://www.simple-first.de/karriere
- https://www.simple-first.de/stellenangebote/ki-digitalisierungsberater-m-w-d
- https://www.simple-first.de/stellenangebote/steuerberater-m-w-d

Current company-owned employee job pages publish monthly salary ranges of €4,500–€6,000 and €5,500–€6,500, confirming pay transparency and adding 6 source-supported points. Regular coaching and external training opportunities do not define an annual learning allowance. Local provisional score changed from 15 to 21.

### syte GmbH (Germany) — 26/100 provisional; existing benefits reconfirmed

- https://www.syte.ms/karriere
- https://www.syte.ms/impressum

The current careers page reconfirms the shared €2,200 annual benefit budget usable for professional or private learning, wellbeing and Kita subsidy, plus access to coaching and mental-health offers. The existing childcare and learning inputs remain supported; coaching access still lacks enough coverage detail for a separate mental-health-budget point. No score input changed.

### TheFamilyGroup (Germany) — 15/100 provisional; no quantified care policy

- https://join.com/companies/thefamilygroup/16410345-founder-associate-chief-of-staff-m-f-d
- https://join.com/companies/thefamilygroup

A current German employee role offers competitive compensation and broad learning exposure but no numeric salary range, annual learning allowance or family-health entitlement. The company's family-product focus is not employee childcare support. No score input changed.

### vOffice Software (Germany) — 15/100 provisional; no benefit schedule

- https://intro.v-office.com/de/jobs

The current company-owned page confirms the German holiday-rental software business but does not expose employee benefit terms. No qualifying care policy was found, and unrelated virtual-office businesses were excluded. No score input changed.

### Wintama IT Solutions GmbH (Germany) — 19/100 provisional; corrected from 15

- https://www.wintama.de/ueber-uns/
- https://join.com/companies/wintamade
- https://join.com/companies/wintamade/16865066-senior-fullstack-developer-in-java-spring-boot-angular

The current company-owned benefits page explicitly offers employees online courses, conferences or an annual learning budget, confirming the learning signal and adding 4 source-supported points. Pension, flexible work and equipment do not establish additional family-health benefits. Local provisional score changed from 15 to 19.

## Evidence-first scoring correction — 12 November 2026

Applied the evidence-governance recommendation across all 131 reviewed companies. Statutory entitlements, legacy defaults and unresolved claims no longer earn employer points. Unknown remains distinct from explicit absence in the evidence ledger, while its numerical contribution is zero. Confirmed public-employer evidence and clearly labelled employee reports are the only inputs applied to the Care Score.

Publication now additionally requires every awarded point to have reviewed evidence. Each research record exposes employer-source points, employee-reported points, total evidence-backed points and employer-source coverage. Six previously published records with no evidence-backed awarded points moved back to the private research queue: Danone, IKEA, Lululemon, McKinsey & Company, Meta and Shopify. The public feed now contains 53 non-zero evidence-backed records.

This correction removes country-law baselines from provisional employer results. In particular:

- Simple First Consulting GmbH is 6/100, based solely on confirmed public salary ranges; the former 15-point German statutory baseline is excluded.
- Wintama IT Solutions GmbH is 4/100, based solely on its confirmed annual learning budget; the former statutory baseline is excluded.
- Applied Materials is 42/100 and Ensono is 26/100 after unresolved legacy inputs were removed; both remain unpublished pending verification.
- Allstate remains 36/100 with all awarded points supported by reviewed employer sources.
- Eurofins Ireland remains 23/100, with 2 public-source points and 21 clearly labelled employee-reported points pending policy verification; no statutory baseline is included.

The 16-signal weights and Care Score v1.1.0 formula are unchanged. The correction changes which researched inputs are eligible to enter the formula, not the arithmetic itself.
