import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowRight, ChevronDown, ExternalLink, Filter, Search, X } from 'lucide-react';
import { CARE_SCORE_VERSION, MAX_RAW_TOTAL, GROUPS, SIGNALS, tierFor } from '../lib/careScore';
import { evidenceDisclaimer, scoredIndexRecords, type ScoredIndexRecord } from '../data/index-records';

const signalColors = ['#5635BD', '#E4A522', '#B94F73', '#4C8A67', '#D8CDF5'];

const tierClass = (score: number) => {
  if (score >= 90) return 'gold';
  if (score >= 75) return 'rising';
  if (score >= 60) return 'listed';
  return 'threshold';
};

function Logo() {
  return <Link className="cf-logo" to="/" aria-label="Carefolio Index home"><img src="/brand/carefolio-human-index-wordmark.svg" alt="Carefolio" /><i>Index</i></Link>;
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="cf-header">
    <div className="cf-frame cf-header-inner">
      <Logo />
      <nav className={open ? 'cf-nav is-open' : 'cf-nav'} aria-label="Main navigation">
        <Link to="/directory" onClick={() => setOpen(false)}>Directory</Link>
        <Link to="/methodology" onClick={() => setOpen(false)}>Methodology</Link>
        <Link to="/corrections" onClick={() => setOpen(false)}>Corrections</Link>
        <a href="https://www.remoteshe.co" onClick={() => setOpen(false)}>RemoteShe <span aria-hidden="true">↗</span></a>
      </nav>
      <Link className="cf-admin-link" to="/admin/evidence">Evidence admin</Link>
      <button className="cf-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X size={19} /> : <span>Menu</span>}</button>
    </div>
  </header>;
}

function Footer() {
  return <footer className="cf-footer"><div className="cf-frame"><Logo /><p>Carefolio Index is an independent research framework for understanding the conditions around work.</p><div><Link to="/methodology">Care Score v1.1.0</Link><Link to="/corrections">Corrections process</Link><Link to="/privacy">Privacy</Link></div></div></footer>;
}

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="cf-site"><SiteHeader /><main>{children}</main><Footer /></div>;
}

function EvidenceMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [orbitTurn, setOrbitTurn] = useState(0);
  const active = SIGNALS[activeIndex]!;

  return <div className="cf-evidence-map" aria-label="Interactive map of the 16 Care Score signals" onPointerMove={(event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const degrees = Math.atan2(event.clientY - bounds.top - bounds.height / 2, event.clientX - bounds.left - bounds.width / 2) * 180 / Math.PI;
    setOrbitTurn(Math.round(degrees * 0.12));
  }} onPointerLeave={() => setOrbitTurn(0)}>
    <p className="cf-bloom-instruction">Interactive signal field · select a marker to inspect</p>
    <div className="cf-bloom-orbit" style={{ '--bloom-turn': `${orbitTurn}deg` } as React.CSSProperties}>
      {SIGNALS.map((signal, index) => <button key={signal.key} type="button" className={activeIndex === index ? 'cf-signal-dot is-active' : 'cf-signal-dot'} onClick={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} aria-pressed={activeIndex === index} aria-label={`${signal.label}, ${signal.weight} points`} style={{ '--angle': `${(360 / SIGNALS.length) * index}deg`, '--dot-color': signalColors[GROUPS.indexOf(signal.group)] } as React.CSSProperties}><b>{signal.weight}</b><em>{signal.label}</em></button>)}
    </div>
    <div className="cf-map-center"><img src="/brand/carefolio-human-index-mark.svg" alt="" /><span>16 signals</span></div>
    <div className="cf-map-inspector"><span>{active.group}</span><b>{active.label}</b><strong>{active.weight} points</strong></div>
  </div>;
}

function ScoreMark({ score, compact = false }: { score: number; compact?: boolean }) {
  return <div className={`cf-score-mark ${tierClass(score)}${compact ? ' compact' : ''}`}><strong>{score}</strong><span>/ 100</span></div>;
}

function DirectoryFilters({ onChange }: { onChange: (filters: { query: string; score: string; country: string; benefit: string }) => void }) {
  const [filters, setFilters] = useState({ query: '', score: 'all', country: 'all', benefit: 'all' });
  const update = (key: keyof typeof filters, value: string) => { const next = { ...filters, [key]: value }; setFilters(next); onChange(next); };
  return <div className="cf-filters" aria-label="Filter the company directory">
    <label className="cf-search"><Search size={16} /><span className="sr-only">Search company</span><input value={filters.query} onChange={(event) => update('query', event.target.value)} placeholder="Search companies" /></label>
    <label><span>Minimum score</span><select value={filters.score} onChange={(event) => update('score', event.target.value)}><option value="all">Any score</option><option value="60">Listed, 60+</option><option value="75">Rising Star, 75+</option><option value="90">Gold Tier, 90+</option></select></label>
    <label><span>Country</span><select value={filters.country} onChange={(event) => update('country', event.target.value)}><option value="all">All countries</option>{[...new Set(scoredIndexRecords.map((record) => record.country))].map((country) => <option key={country}>{country}</option>)}</select></label>
    <label><span>Benefit</span><select value={filters.benefit} onChange={(event) => update('benefit', event.target.value)}><option value="all">Any evidence</option>{SIGNALS.map((signal) => <option value={signal.key} key={signal.key}>{signal.label}</option>)}</select></label>
  </div>;
}

function DirectoryTable({ records }: { records: ScoredIndexRecord[] }) {
  if (!records.length) return <div className="cf-empty"><p>No evidence records meet those filters yet.</p><span>Try broadening a filter. Missing evidence is not treated as a missing benefit.</span></div>;
  return <div className="cf-directory-table"><div className="cf-table-head"><span>Company</span><span>Evidence scope</span><span>Status</span><span>Care Score</span></div>{records.map((record, index) => <Link className="cf-company-row" to={`/companies/${record.id}`} key={record.id}><span className="cf-rank">{String(index + 1).padStart(2, '0')}</span><span><b>{record.name}</b><small>{record.industry} · {record.country}</small></span><span className="cf-row-scope">{record.scope}</span><span><i className="cf-status">{record.status}</i><small className="cf-row-review">Reviewed {record.lastReviewed}</small></span><ScoreMark score={record.score} compact /><ArrowRight className="cf-row-arrow" size={16} /></Link>)}</div>;
}

function DirectoryBlock({ title = 'Ranked company evidence', intro = `A local snapshot of ${scoredIndexRecords.length} researched employer profiles, ordered only by the current Care Score formula. Commercial visibility does not change a score or an organic position.` }: { title?: string; intro?: string }) {
  const [filters, setFilters] = useState({ query: '', score: 'all', country: 'all', benefit: 'all' });
  const records = useMemo(() => scoredIndexRecords.filter((record) => {
    const query = filters.query.toLowerCase();
    const minScore = filters.score === 'all' ? 0 : Number(filters.score);
    return (!query || record.name.toLowerCase().includes(query) || record.industry.toLowerCase().includes(query)) &&
      record.score >= minScore && (filters.country === 'all' || record.country === filters.country) &&
      (filters.benefit === 'all' || record.signals.some((signal) => signal.key === filters.benefit && signal.earned > 0));
  }), [filters]);
  return <section className="cf-directory-section" id="directory"><div className="cf-frame"><div className="cf-section-head"><div><p className="cf-eyebrow">Public index</p><h2>{title}</h2></div><p>{intro}</p></div><DirectoryFilters onChange={setFilters} /><DirectoryTable records={records} /><p className="cf-directory-note">Records below 60 remain visible as evidence files but carry the “Below the current listing threshold” tier. Evidence reviewed means a signal-level public link is available. Indexed records retain their researched profile while Carefolio reconciles the source ledger.</p></div></section>;
}

export function IndexLanding() {
  return <Layout><section className="cf-hero"><div className="cf-frame cf-hero-running-head"><span>Carefolio Index™</span><span>Field note 01</span><span>Evidence review · August 2026</span></div><div className="cf-frame cf-hero-grid"><div className="cf-hero-copy"><p className="cf-eyebrow">An independent research index</p><h1>Care conditions, made legible.</h1><p className="cf-lede">The Carefolio Index compares the policies that shape life around work, using named sources and a fixed 16-signal calculation.</p><div className="cf-actions"><a className="cf-button" href="#directory">Explore the index <ArrowRight size={16} /></a><Link className="cf-text-link" to="/methodology">Read the method</Link></div><dl className="cf-hero-legend"><div><dt>01</dt><dd><b>16 signals</b><span>Each has a published weight.</span></dd></div><div><dt>02</dt><dd><b>100 points</b><span>Scores are formula-led, never negotiated.</span></dd></div><div><dt>03</dt><dd><b>Monthly review</b><span>Evidence can update the record.</span></dd></div></dl></div><EvidenceMap /></div><div className="cf-frame cf-hero-footnote"><span>How to read the signal field</span><p>Colour identifies a signal family. Shape differentiates individual evidence markers. Select a marker to see its exact contribution to the Care Score.</p></div></section><section className="cf-intro"><div className="cf-frame cf-intro-grid"><p>Created by Carefolio</p><div><h2>One framework. Three products.</h2><p>Carefolio maintains the method, evidence and Care Scores. RemoteShe uses the resulting company information in job discovery. MomOps supplies care lenses as flexible starting points, never fixed identities.</p></div><div className="cf-stat"><b>0–100</b><span>score range<br />16 weighted signals</span></div></div></section><DirectoryBlock /><section className="cf-score-explainer"><div className="cf-frame cf-score-grid"><div><p className="cf-eyebrow">The Care Score</p><h2>Measured evidence, not a promise of experience.</h2><p>Each signal earns its published weight only when a source supports it. If a benefit cannot be verified, it receives zero until evidence is added and reviewed.</p><Link to="/methodology" className="cf-text-link">Read the complete methodology <ArrowRight size={16} /></Link></div><div className="cf-tier-list">{[{ score: 90, label: 'Gold Tier', note: '90–100' }, { score: 75, label: 'Rising Star', note: '75–89' }, { score: 60, label: 'Listed', note: '60–74' }, { score: 0, label: 'Below current listing threshold', note: 'Below 60' }].map((tier) => <div key={tier.label}><ScoreMark score={tier.score} compact /><span><b>{tier.label}</b><small>{tier.note}</small></span></div>)}</div></div></section><section className="cf-disclaimer"><div className="cf-frame"><p>{evidenceDisclaimer}</p><Link to="/corrections">Submit a correction <ArrowRight size={16} /></Link></div></section></Layout>;
}

export function IndexDirectory() { return <Layout><section className="cf-page-head"><div className="cf-frame"><p className="cf-eyebrow">Carefolio Index™</p><h1>Company evidence directory</h1><p>Sorted by calculated Care Score. Filter by the evidence that matters to you, then inspect every source in the record.</p></div></section><DirectoryBlock title="All public evidence files" intro={`A ${scoredIndexRecords.length}-company research snapshot from the Carefolio and RemoteShe evidence system. Companies awaiting research or with no scored benefits are excluded from public results. Carefolio calculates each published score from the available benefit information.`} /></Layout>; }

export function CompanyEvidencePage({ record }: { record: ScoredIndexRecord }) {
  const grouped = GROUPS.map((group) => ({ group, signals: record.signals.filter((signal) => signal.group === group) }));
  return <Layout><section className="cf-company-head"><div className="cf-frame"><Link className="cf-back" to="/directory">← Directory</Link><div className="cf-company-head-grid"><div><p className="cf-eyebrow">{record.industry} · {record.country}</p><h1>{record.name}</h1><p>{record.scope}</p><div className="cf-meta"><span className="cf-status">{record.status}</span><span>Last reviewed {record.lastReviewed}</span></div></div><div><ScoreMark score={record.score} /><p className="cf-tier-label">{record.tier.label}</p></div></div></div></section><section className="cf-company-body"><div className="cf-frame cf-company-columns"><div><p className="cf-eyebrow">Signal ledger</p><h2>Care Score {record.score} / 100</h2><p className="cf-method-note">Powered by the Carefolio Index™. The score recalculates from the 16 signals when verified policy information changes.</p>{grouped.map(({ group, signals }) => <section className="cf-signal-group" key={group}><h3>{group}</h3>{signals.map((signal) => <div key={signal.key} className={signal.earned ? 'cf-signal-row earned' : 'cf-signal-row'}><span>{signal.label}</span><b>{signal.earned} <small>/ {signal.weight}</small></b></div>)}</section>)}</div><aside className="cf-evidence-aside"><p className="cf-eyebrow">Source register</p><h2>Public employer sources</h2>{record.employeeReport && <section className="cf-aside-note"><h3>Employee report · pending review</h3><p>Received {record.employeeReport.received_at}</p><p>{record.employeeReport.note}</p></section>}{record.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><b>{source.label} <ExternalLink size={13} /></b><span>{source.note}</span></a>)}<p className="cf-aside-note">Policy availability can vary by location and employee eligibility. The evidence scope above describes what this record covers.</p></aside></div></section><section className="cf-disclaimer"><div className="cf-frame"><p>{evidenceDisclaimer}</p></div></section></Layout>;
}

export function CompanyRoute() { const { pathname } = useLocation(); const id = pathname.split('/').pop(); const record = scoredIndexRecords.find((item) => item.id === id); return record ? <CompanyEvidencePage record={record} /> : <IndexDirectory />; }

export function MethodologyPage() { return <Layout><section className="cf-page-head"><div className="cf-frame"><p className="cf-eyebrow">Care Score v{CARE_SCORE_VERSION}</p><h1>The complete methodology</h1><p>The Care Score is a deterministic calculation. Care Score = round(earned points ÷ {MAX_RAW_TOTAL} × 100). Boolean signals earn their full weight when reported present; numeric signals earn partial points at the thresholds below. Unknown inputs earn zero. Evidence status is shown separately.</p></div></section><section className="cf-method-grid"><div className="cf-frame">{GROUPS.map((group, groupIndex) => <section key={group}><header><span style={{ background: signalColors[groupIndex] }}>{String(groupIndex + 1).padStart(2, '0')}</span><h2>{group}</h2></header>{SIGNALS.filter((signal) => signal.group === group).map((signal) => <div className="cf-method-signal" key={signal.key}><span>{signal.label}</span><b>{signal.weight} pts</b></div>)}</section>)}</div></section><section className="cf-method-rules"><div className="cf-frame"><div><p>Maternity leave: 26+ paid weeks = 12 points; 16+ = 9; 12+ = 6; more than zero = 3. Paternity leave: 16+ paid weeks = 8 points; 8+ = 6; 4+ = 4; more than zero = 2. Women in leadership: 50%+ = 8 points; 40%+ = 6; 30%+ = 4; more than zero = 2.</p><p className="cf-eyebrow">Review rule</p><h2>Evidence can change inputs. It cannot change the formula.</h2></div><ol><li>We collect information from public employer sources or employer-submitted evidence.</li><li>A reviewer checks the claim against the defined signal and its scope.</li><li>The versioned formula recalculates the score. It is then published with a status, source links and review date.</li></ol></div></section><section className="cf-disclaimer"><div className="cf-frame"><p>{evidenceDisclaimer}</p></div></section></Layout>; }

export function CorrectionsPage() { return <Layout><section className="cf-page-head"><div className="cf-frame"><p className="cf-eyebrow">Evidence accountability</p><h1>Correct the record.</h1><p>Employers, employees and researchers can flag an inaccurate claim or supply a better public source. A correction does not change a score until evidence is reviewed.</p></div></section><section className="cf-corrections"><div className="cf-frame cf-corrections-grid"><div><h2>What to send</h2><ul><li>The company name and country or benefit scope</li><li>The signal you believe needs changing</li><li>A direct public link or employer evidence</li><li>Why the current record is inaccurate or out of date</li></ul></div><div><h2>What happens next</h2><ol><li>We log the evidence for the next review queue.</li><li>We compare it to the versioned signal definition.</li><li>Accepted evidence updates the record and recalculates the score.</li></ol><a className="cf-button" href="mailto:evidence@carefolio.io?subject=Carefolio%20Index%20correction">Submit evidence <ArrowRight size={16} /></a></div></div></section></Layout>; }

export function EvidenceAdmin() { return <Layout><section className="cf-page-head cf-admin-head"><div className="cf-frame"><p className="cf-eyebrow">Private workspace</p><h1>Monthly evidence review</h1><p>Use this protected route to review sources, confirm scope and publish a recalculated result. Featured placement is not an evidence state and is never part of this workflow.</p></div></section><section className="cf-admin-workbench"><div className="cf-frame"><div className="cf-admin-tools"><b>Review queue · August 2026</b><button>Export review ledger</button></div>{scoredIndexRecords.map((record) => <article key={record.id}><div><span className="cf-status">{record.status}</span><h2>{record.name}</h2><p>{record.sources.length} public sources · last reviewed {record.lastReviewed}</p></div><ScoreMark score={record.score} compact /><div className="cf-admin-actions"><button>Open evidence</button><button className="primary">Start review</button></div></article>)}</div></section></Layout>; }

export function AdminAccessPage() { return <Layout><section className="cf-page-head cf-admin-head"><div className="cf-frame"><p className="cf-eyebrow">Evidence administration</p><h1>Private review workspace</h1><p>Evidence review is an internal function. This localhost preview preserves the protected route but does not include a client-side sign-in or a public administrator account.</p></div></section><section className="cf-corrections"><div className="cf-frame cf-corrections-grid"><div><h2>Production access</h2><p>Connect this route to the repository’s approved server-side identity provider before publishing. Care Scores must only be updated through an authenticated evidence review.</p></div><div><h2>Public route</h2><p>Employers and researchers should use the corrections process to supply sources. It does not grant administrative access or change a score automatically.</p><Link className="cf-button" to="/corrections">View corrections process <ArrowRight size={16} /></Link></div></div></section></Layout>; }
