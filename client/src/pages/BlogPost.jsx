import { useParams, Link } from 'react-router-dom'

export default function BlogPost() {
  const { id } = useParams()

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 48px 120px' }}>
        <Link to="/blog" style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em',
          color: 'var(--gold-dim)', textDecoration: 'none', textTransform: 'uppercase',
          display: 'inline-block', marginBottom: '60px',
          transition: 'color 0.3s',
        }}
          onMouseEnter={e => e.target.style.color = 'var(--gold)'}
          onMouseLeave={e => e.target.style.color = 'var(--gold-dim)'}>
          ← All Articles
        </Link>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {['Node.js', 'Backend'].map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase',
              border: '1px solid rgba(201,168,76,0.3)', padding: '2px 8px',
            }}>{t}</span>
          ))}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          color: 'var(--cream)',
          marginBottom: '24px',
        }}>
          Blog Post #{id}
        </h1>

        <div style={{
          display: 'flex', gap: '24px', alignItems: 'center',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '48px',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--gold-dim)', letterSpacing: '0.1em' }}>
            March 15, 2024
          </span>
          <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--gold-dim)', letterSpacing: '0.1em' }}>
            8 min read
          </span>
        </div>

        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--cream-dim)' }}>
          <p style={{ marginBottom: '24px' }}>
            Blog content will be fetched from your MongoDB backend once connected. Add a <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'rgba(201,168,76,0.1)', padding: '2px 6px', color: 'var(--gold)' }}>content</code> field to your Blog model to store markdown or rich text.
          </p>
          <p>
            You can use a library like <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'rgba(201,168,76,0.1)', padding: '2px 6px', color: 'var(--gold)' }}>react-markdown</code> to render the content beautifully.
          </p>
        </div>
      </div>
    </div>
  )
}
