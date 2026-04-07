import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)
  const [visible, setVisible] = useState(false)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let particles = []
    let mouse = { x: W / 2, y: H / 2 }

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

    // Create particles
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    let frame
    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Subtle radial glow behind center
      const grd = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.55)
      grd.addColorStop(0, 'rgba(201,168,76,0.04)')
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, W, H)

      // Mouse glow
      const mgrd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200)
      mgrd.addColorStop(0, 'rgba(201,168,76,0.06)')
      mgrd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = mgrd
      ctx.fillRect(0, 0, W, H)

      particles.forEach(p => {
        // Attract slightly to mouse
        const dx = mouse.x - p.x, dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 300) {
          p.vx += dx * 0.000015
          p.vy += dy * 0.000015
        }
        p.vx *= 0.998; p.vy *= 0.998
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(201,168,76,${0.12 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      frame = requestAnimationFrame(draw)
    }
    draw()
    setTimeout(() => setVisible(true), 100)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [])

  const nameChars = "Goldy Lokhande".split('')

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, zIndex: 0,
      }} />

      {/* Grid lines decoration */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Side label */}
      <div style={{
        position: 'absolute', left: '24px', top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.25em',
        color: 'var(--gold-dim)',
        textTransform: 'uppercase',
        zIndex: 2,
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s 1.5s',
      }}>
        Full Stack Developer — 2026
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', right: '36px', bottom: '48px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        zIndex: 2,
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s 2s',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--gold-dim)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</span>
        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(var(--gold), transparent)' }} />
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '0 80px',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '24px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.8s 0.2s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
          }}>
            Available for opportunities
          </span>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 8px #4ade80',
            animation: 'blink 2s ease-in-out infinite',
          }} />
        </div>

        {/* Name with glitch + char animation */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 10vw, 9rem)',
          fontWeight: 300,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: 'var(--cream)',
          marginBottom: '12px',
          position: 'relative',
        }}>
          <span className="glitch-wrapper">
            {nameChars.map((c, i) => (
              <span key={i} style={{
                display: 'inline-block',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(60px)',
                transition: `all 0.7s ${0.4 + i * 0.04}s cubic-bezier(0.16,1,0.3,1)`,
              }}>{c === ' ' ? '\u00A0' : c}</span>
            ))}
            <span className="glitch-clone1" aria-hidden>Goldy Lokhande</span>
            <span className="glitch-clone2" aria-hidden>Goldy Lokhande</span>
          </span>
        </h1>

        {/* Gold underline */}
        <div style={{
          height: '2px',
          width: '840px',
          maxWidth: '80%',
          background: 'linear-gradient(90deg, var(--gold), transparent)',
          marginBottom: '32px',
          transformOrigin: 'left',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.2s 0.9s cubic-bezier(0.16,1,0.3,1)',
        }} />

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--cream-dim)',
          marginBottom: '48px',
          maxWidth: '580px',
          lineHeight: 1.5,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.8s 1s cubic-bezier(0.16,1,0.3,1)',
        }}>
          Crafting digital experiences that live at the intersection of
          <em style={{ color: 'var(--gold)' }}> engineering precision</em> and
          <em style={{ color: 'var(--gold)' }}> design elegance.</em>
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: '20px', flexWrap: 'wrap',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.8s 1.2s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <a href="#projects" data-hover style={primaryBtn}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--obsidian)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.borderColor = 'var(--cream)' }}>
            View My Work
          </a>
          <a href="#contact" data-hover style={secondaryBtn}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--cream-dim)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}>
            Let's Talk →
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: '48px', marginTop: '80px',
          borderTop: '1px solid rgba(201,168,76,0.15)',
          paddingTop: '32px',
          flexWrap: 'wrap',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s 1.5s',
        }}>
          {[['2+', 'Years Experience'], ['15+', 'Projects Built'], ['5+', 'Technologies'], ['100%', 'Passion']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--cream-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const primaryBtn = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--cream)',
  border: '1px solid var(--cream)',
  padding: '14px 32px',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  background: 'transparent',
}

const secondaryBtn = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--cream-dim)',
  border: '1px solid rgba(255,255,255,0.2)',
  padding: '14px 32px',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
}
