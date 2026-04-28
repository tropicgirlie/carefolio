import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  name: string;
  score: number;
  change: number;
}

const TICKER_DATA: TickerItem[] = [
  { symbol: 'CRM', name: 'Salesforce', score: 89, change: +2.1 },
  { symbol: 'MSFT', name: 'Microsoft', score: 84, change: +0.8 },
  { symbol: 'NFLX', name: 'Netflix', score: 83, change: +1.4 },
  { symbol: 'CSCO', name: 'Cisco', score: 82, change: +0.3 },
  { symbol: 'SPOT', name: 'Spotify', score: 81, change: +1.9 },
  { symbol: 'ADBE', name: 'Adobe', score: 78, change: -0.5 },
  { symbol: 'NVDA', name: 'NVIDIA', score: 76, change: +3.2 },
  { symbol: 'SHOP', name: 'Shopify', score: 74, change: +0.6 },
  { symbol: 'ETSY', name: 'Etsy', score: 72, change: -1.1 },
  { symbol: 'META', name: 'Meta', score: 58, change: -2.3 },
  { symbol: 'AMZN', name: 'Amazon', score: 52, change: -0.9 },
  { symbol: 'UBER', name: 'Uber', score: 41, change: -1.7 },
];

const ITEMS = [...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA];

// Compact label width in px — keep in sync with pl offset
const LABEL_W = 88;

export function CareMarketTicker() {
  return (
    <div
      className="relative overflow-hidden border-y"
      style={{
        background: 'rgba(43,174,102,0.03)',
        borderColor: 'rgba(43,174,102,0.12)',
        height: '36px',
      }}
      aria-label="Care Market Index live ticker"
    >
      {/* Label pill — sits at fixed left, covers the fade */}
      <div
        className="absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center px-3 flex-shrink-0"
        style={{
          width: `${LABEL_W}px`,
          background: '#2BAE66',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'white',
          whiteSpace: 'nowrap',
        }}
      >
        CARE INDEX
      </div>

      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, white, transparent)' }}
      />

      {/* Scrolling track */}
      <div
        className="absolute top-0 bottom-0 overflow-hidden"
        style={{ left: `${LABEL_W}px`, right: 0 }}
      >
        <motion.div
          className="flex items-center h-full"
          style={{ width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={`${item.symbol}-${i}`}
              className="flex items-center gap-2 px-4 h-full"
              style={{ borderRight: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--bg-deep-navy)',
                  fontFeatureSettings: "'tnum' 1",
                }}
              >
                {item.symbol}
              </span>
              {/* Hide full name on very small screens */}
              <span
                className="hidden sm:inline"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#2BAE66',
                  fontFeatureSettings: "'tnum' 1",
                }}
              >
                {item.score}
              </span>
              <span
                className="flex items-center gap-0.5"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 500,
                  color: item.change >= 0 ? '#2BAE66' : '#FF6B6B',
                  fontFeatureSettings: "'tnum' 1",
                }}
              >
                {item.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {item.change >= 0 ? '+' : ''}{item.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
