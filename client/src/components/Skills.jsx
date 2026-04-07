import { useEffect, useRef, useState } from 'react'

const skillGroups = [
  {
    category: 'Frontend',
    icon: '◈',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'JavaScript / ES6+', level: 90 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Framer Motion', level: 78 },
      { name: 'HTML / CSS', level: 95 },
    ],
  },
  {
    category: 'Backend',
    icon: '◇',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 85 },
      { name: 'REST API Design', level: 87 },
      { name: 'JWT / Auth', level: 82 },
      { name: 'Socket.io', level: 72 },
    ],
  },
  {
    category: 'Database & Tools',
    icon: '◉',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'Git / GitHub', level: 90 },
      { name: 'Postman', level: 88 },
      { name: 'Vercel / Render', level: 83 },
      { name: 'Docker (basics)', level: 60 },
    ],
  },
]

export default function Skills() {
  const ref = useRef()
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setAnimated(true)
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(e => e.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible') }), { threshold: 0.1 })
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} style={{
      padding: '140px 80px',
      background: 'var(--obsidian-2)',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '80px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>03 — Skills</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px' }}>
          {skillGroups.map((group, gi) => (
            <div key={group.category} className="reveal" style={{ transitionDelay: `${gi * 0.15}s` }}>
              {/* Group header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>{group.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: 'var(--cream)',
                  textTransform: 'uppercase',
                }}>{group.category}</span>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {group.skills.map((skill, si) => (
                  <SkillBar key={skill.name} skill={skill} animated={animated} delay={gi * 0.15 + si * 0.08} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: Tech icons row */}
        <div className="reveal" style={{ marginTop: '80px', paddingTop: '48px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            color: 'var(--gold-dim)',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>Also familiar with</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['TypeScript', 'Next.js', 'GraphQL', 'Redis', 'AWS S3', 'Firebase', 'Webpack', 'Jest', 'Figma'].map(t => (
              <span key={t} data-hover style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                color: 'var(--cream-dim)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.3s',
                cursor: 'default',
              }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.color = 'var(--cream-dim)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillBar({ skill, animated, delay }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', color: 'var(--cream-dim)' }}>{skill.name}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold-dim)' }}>{skill.level}%</span>
      </div>
      {/* Track */}
      <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        {/* Fill */}
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: animated ? `${skill.level}%` : '0%',
          background: `linear-gradient(90deg, var(--gold), rgba(201,168,76,0.4))`,
          transition: `width 1.2s ${delay}s cubic-bezier(0.16, 1, 0.3, 1)`,
        }} />
        {/* Shine dot */}
        <div style={{
          position: 'absolute', top: '-2px',
          left: animated ? `calc(${skill.level}% - 3px)` : '-6px',
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: 'var(--gold)',
          boxShadow: '0 0 8px var(--gold)',
          transition: `left 1.2s ${delay}s cubic-bezier(0.16, 1, 0.3, 1)`,
        }} />
      </div>
    </div>
  )
}
