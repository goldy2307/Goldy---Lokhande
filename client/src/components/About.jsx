import { useEffect, useRef } from 'react'

export default function About() {
  const ref = useRef()

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.15 })
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const codeSnippet = `const developer = {
  name: "Your Name",
  stack: ["React", "Node", "MongoDB"],
  passion: "Building the web",
  available: true,
  coffee: Infinity
};`

  return (
    <section id="about" ref={ref} style={{
      padding: '140px 80px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {/* Section label */}
      <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '80px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>01 — About</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}
        className="flex flex-col md:grid">

        {/* Left: Text */}
        <div>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: 'var(--cream)',
            marginBottom: '32px',
          }}>
            Turning ideas into<br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>living software.</span>
          </h2>

          <p className="reveal" style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.05rem',
            lineHeight: 1.85,
            color: 'var(--cream-dim)',
            marginBottom: '24px',
            transitionDelay: '0.1s',
          }}>
            I'm a Full Stack Developer who builds complete, production-ready web applications. From database architecture to pixel-perfect interfaces, I care deeply about every layer of the stack.
          </p>

          <p className="reveal" style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.05rem',
            lineHeight: 1.85,
            color: 'var(--cream-dim)',
            marginBottom: '48px',
            transitionDelay: '0.2s',
          }}>
            My work lives at the intersection of <span style={{ color: 'var(--cream)' }}>technical excellence</span> and <span style={{ color: 'var(--cream)' }}>thoughtful design</span>. I believe great software should be fast, accessible, and delightful to use.
          </p>

          {/* Social links */}
          <div className="reveal" style={{ display: 'flex', gap: '16px', transitionDelay: '0.3s' }}>
            {[
              { label: 'GitHub ↗', href: 'https://github.com' },
              { label: 'LinkedIn ↗', href: 'https://linkedin.com' },
              { label: 'Twitter ↗', href: 'https://twitter.com' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" data-hover
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--cream-dim)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--gold-dim)',
                  paddingBottom: '2px',
                  transition: 'color 0.3s, border-color 0.3s',
                }}
                onMouseEnter={e => { e.target.style.color = 'var(--gold)'; e.target.style.borderColor = 'var(--gold)' }}
                onMouseLeave={e => { e.target.style.color = 'var(--cream-dim)'; e.target.style.borderColor = 'var(--gold-dim)' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Code card + photo placeholder */}
        <div className="reveal" style={{ transitionDelay: '0.2s' }}>
          {/* Profile image with gold border */}
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <div style={{
              width: '100%',
              maxWidth: '360px',
              aspectRatio: '3/4',
              background: 'var(--obsidian-3)',
              border: '1px solid rgba(201,168,76,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <img src="https://placehold.co/360x480/111114/c9a84c?text=Your+Photo"
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(20%)' }} />
              {/* Gold corner accents */}
              {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: '20px', height: '20px',
                  borderTop: i < 2 ? '2px solid var(--gold)' : 'none',
                  borderBottom: i >= 2 ? '2px solid var(--gold)' : 'none',
                  borderLeft: i % 2 === 0 ? '2px solid var(--gold)' : 'none',
                  borderRight: i % 2 === 1 ? '2px solid var(--gold)' : 'none',
                  top: i < 2 ? '-1px' : 'auto',
                  bottom: i >= 2 ? '-1px' : 'auto',
                  left: i % 2 === 0 ? '-1px' : 'auto',
                  right: i % 2 === 1 ? '-1px' : 'auto',
                }} />
              ))}
            </div>
            {/* Offset shadow box */}
            <div style={{
              position: 'absolute',
              top: '16px', left: '16px',
              width: '100%', maxWidth: '360px',
              aspectRatio: '3/4',
              border: '1px solid rgba(201,168,76,0.1)',
              zIndex: -1,
            }} />
          </div>

          {/* Code snippet card */}
          <div style={{
            background: 'var(--obsidian-2)',
            border: '1px solid rgba(201,168,76,0.15)',
            padding: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            lineHeight: 1.7,
            color: 'var(--cream-dim)',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => (
                <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
            </div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {codeSnippet.split('\n').map((line, i) => (
                <div key={i}>
                  {line.includes('name') || line.includes('stack') || line.includes('passion') || line.includes('available') || line.includes('coffee')
                    ? <><span style={{ color: 'var(--gold-dim)' }}>{line.split(':')[0]}:</span><span style={{ color: 'var(--gold)' }}>{line.split(':').slice(1).join(':')}</span></>
                    : <span style={{ color: line.includes('const') ? '#7dd3fc' : 'var(--cream-dim)' }}>{line}</span>
                  }
                </div>
              ))}
            </pre>
            <div style={{
              position: 'absolute', bottom: '24px', right: '24px',
              width: '8px', height: '16px',
              background: 'var(--gold)',
              opacity: 0.7,
              animation: 'blink 1s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>
    </section>
  )
}
