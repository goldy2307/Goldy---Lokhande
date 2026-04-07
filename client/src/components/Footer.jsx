export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(201,168,76,0.1)',
      padding: '48px 80px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      background: 'var(--obsidian-2)',
    }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 300, color: 'var(--cream-dim)' }}>
       <img
          src="/goldy_name.png"
          alt="Goldy Logo"
          style={{
            height: "42px",        // 🔥 CONTROL SIZE HERE
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </span>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--gold-dim)', textTransform: 'uppercase' }}>
        © {new Date().getFullYear()} — Designed & Built with precision
      </p>

      <div style={{ display: 'flex', gap: '24px' }}>
        {['GitHub', 'LinkedIn', 'Twitter'].map(s => (
          <a key={s} href="#" data-hover style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: 'var(--gold-dim)',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'var(--gold-dim)'}>
            {s}
          </a>
        ))}
      </div>
    </footer>
  )
}
