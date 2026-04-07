import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../api/index'

const demoProjects = [
  {
    _id: '1',
    title: 'NexCommerce',
    category: 'Full Stack',
    description: 'A high-performance e-commerce platform with real-time inventory, Stripe payments, and an admin analytics dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    githubUrl: '#', liveUrl: '#',
    year: '2024',
    accent: '#c9a84c',
  },
  {
    _id: '2',
    title: 'Lumina CMS',
    category: 'Web App',
    description: 'A headless CMS with markdown editor, media management, JWT auth, and a beautiful editorial interface.',
    techStack: ['React', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    githubUrl: '#', liveUrl: '#',
    year: '2024',
    accent: '#7dd3fc',
  },
  {
    _id: '3',
    title: 'SyncBoard',
    category: 'Real-time',
    description: 'A collaborative kanban board with Socket.io real-time sync, drag-and-drop, and team workspaces.',
    techStack: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    githubUrl: '#', liveUrl: '#',
    year: '2023',
    accent: '#86efac',
  },
  {
    _id: '4',
    title: 'DevFolio API',
    category: 'Backend',
    description: 'A RESTful API service for developer portfolios with rate limiting, caching, and full CRUD with auth.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'JWT'],
    githubUrl: '#', liveUrl: '#',
    year: '2023',
    accent: '#f9a8d4',
  },
]

export default function Projects() {
  const ref = useRef()
  const trackRef = useRef()
  const [active, setActive] = useState(0)
  const { data } = useQuery({ queryKey: ['projects'], queryFn: getProjects, retry: false })
  const projects = data?.data?.length ? data.data : demoProjects

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(e => e.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible') }), { threshold: 0.1 })
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} style={{ padding: '140px 0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '0 80px', marginBottom: '80px' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>02 — Projects</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: 'var(--cream)',
          }}>
            Selected<br /><span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>work.</span>
          </h2>
          {/* Dot navigation */}
          <div className="reveal" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {projects.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} data-hover
                style={{
                  width: active === i ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: active === i ? 'var(--gold)' : 'var(--smoke)',
                  border: 'none',
                  cursor: 'none',
                  transition: 'all 0.3s',
                }} />
            ))}
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ padding: '0 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2px' }}>
        {projects.map((p, i) => (
          <ProjectCard key={p._id} project={p} index={i} isActive={active === i} onClick={() => setActive(i)} />
        ))}
      </div>

      {/* Featured active project detail */}
      <div style={{ padding: '60px 80px 0', borderTop: '1px solid rgba(201,168,76,0.1)', marginTop: '60px' }}>
        <ProjectDetail project={projects[active]} />
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="reveal"
      data-hover
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '40px 36px',
        background: isActive ? 'var(--obsidian-3)' : 'transparent',
        border: `1px solid ${isActive ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.05)'}`,
        cursor: 'none',
        transition: 'all 0.4s ease',
        transitionDelay: `${index * 0.1}s`,
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Number */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: isActive ? 'var(--gold)' : 'var(--gold-dim)',
        letterSpacing: '0.2em',
        marginBottom: '20px',
        transition: 'color 0.3s',
      }}>
        {String(index + 1).padStart(2, '0')} — {project.year}
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        color: project.accent,
        textTransform: 'uppercase',
        marginBottom: '8px',
        opacity: 0.8,
      }}>{project.category}</div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.8rem',
        fontWeight: 400,
        color: isActive ? 'var(--cream)' : 'var(--cream-dim)',
        lineHeight: 1.2,
        marginBottom: '16px',
        transition: 'color 0.3s',
      }}>{project.title}</h3>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px',
      }}>
        {project.techStack?.slice(0, 3).map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: 'var(--cream-dim)',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px 8px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>{t}</span>
        ))}
      </div>

      {/* Hover gold line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '2px',
        width: hovered || isActive ? '100%' : '0%',
        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        transition: 'width 0.4s ease',
      }} />
    </div>
  )
}

function ProjectDetail({ project }) {
  if (!project) return null
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr auto',
      gap: '48px', alignItems: 'end',
      animation: 'fadeInUp 0.5s ease',
    }}>
      <div>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          fontStyle: 'italic',
          color: 'var(--cream-dim)',
          lineHeight: 1.7,
          maxWidth: '700px',
        }}>{project.description}</p>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
        <a href={project.githubUrl} target="_blank" rel="noreferrer" data-hover
          style={detailBtnStyle}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--cream-dim)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}>
          Code ↗
        </a>
        <a href={project.liveUrl} target="_blank" rel="noreferrer" data-hover
          style={{ ...detailBtnStyle, color: 'var(--obsidian)', background: 'var(--gold)', borderColor: 'var(--gold)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)' }}>
          Live ↗
        </a>
      </div>
    </div>
  )
}

const detailBtnStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.68rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--cream-dim)',
  border: '1px solid rgba(255,255,255,0.15)',
  padding: '12px 24px',
  textDecoration: 'none',
  transition: 'all 0.3s',
  whiteSpace: 'nowrap',
}
