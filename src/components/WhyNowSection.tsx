import { motion } from 'motion/react';
import { TrendingUp, Users, Leaf } from 'lucide-react';

const STATS = [
  {
    icon: TrendingUp,
    value: '$30T',
    label: 'Wealth transfer to women by 2030',
    sub: 'The largest redistribution of capital in modern history. It is already underway.',
    color: '#6B3FA0',
    bg: 'rgba(107,63,160,0.06)',
    border: 'rgba(107,63,160,0.12)',
  },
  {
    icon: Users,
    value: '73%',
    label: 'Of mothers factor benefits before accepting a job',
    sub: 'Care infrastructure is now a primary hiring filter, not an afterthought.',
    color: '#2BAE66',
    bg: 'rgba(43,174,102,0.06)',
    border: 'rgba(43,174,102,0.12)',
  },
  {
    icon: Leaf,
    value: '40%',
    label: 'Lower turnover at top-quartile Care Score companies',
    sub: 'Companies that invest in care retain the talent that ESG reports can\'t quantify.',
    color: '#F25C05',
    bg: 'rgba(242,92,5,0.06)',
    border: 'rgba(242,92,5,0.12)',
  },
];

export function WhyNowSection() {
  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: 'rgba(0,0,0,0.015)' }}
      aria-labelledby="why-now-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="mb-12"
        >
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-6"
            style={{
              background: 'rgba(107,63,160,0.06)',
              border: '1px solid rgba(107,63,160,0.12)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2BAE66' }} />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: '#6B3FA0',
              }}
            >
              WHY 2026 IS THE INFLECTION POINT
            </span>
          </div>

          <h2
            id="why-now-heading"
            style={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: 'var(--bg-deep-navy)',
              maxWidth: '520px',
            }}
          >
            The market is moving.{' '}
            <span style={{ color: '#6B3FA0' }}>Are the companies you invest in?</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.2, 0, 0, 1] }}
                className="rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300"
                style={{
                  background: stat.bg,
                  border: `1px solid ${stat.border}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 32px ${stat.bg}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'white', boxShadow: `0 2px 8px ${stat.border}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                      fontWeight: 600,
                      color: stat.color,
                      lineHeight: 1,
                      fontFeatureSettings: "'tnum' 1",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Figtree', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: '15px',
                      color: 'var(--bg-deep-navy)',
                      marginTop: '6px',
                      lineHeight: 1.35,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginTop: 'auto',
                  }}
                >
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}