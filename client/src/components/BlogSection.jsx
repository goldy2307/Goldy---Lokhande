import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBlogs } from '../api/index'

const demoBlogs = [
  { _id: '1', title: 'Building Scalable REST APIs with Node.js and Express', excerpt: 'A deep dive into architecture patterns, rate limiting, caching strategies, and best practices for production-grade APIs.', date: '2024-03-15', tags: ['Node.js', 'Backend'] },
  { _id: '2', title: 'The Art of State Management in React 19', excerpt: 'Exploring when to use useState, useReducer, Context, Zustand, and server state tools like React Query.', date: '2024-02-20', tags: ['React', 'Frontend'] },
  { _id: '3', title: 'MongoDB Performance: Indexing Strategies That Matter', excerpt: 'How compound indexes, covered queries, and aggregation pipelines can make or break your app performance.', date: '2024-01-10', tags: ['MongoDB', 'Database'] },
]

export default function BlogSection() {
  const ref = useRef()
  const { data } = useQuery({ queryKey: ['blogs'], queryFn: getBlogs, retry: false })
  const blogs = data?.data?.length ? data.data.slice(0, 3) : demoBlogs

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(e => e.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible') }), { threshold: 0.1 })
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="blog" ref={ref} style={{ padding: '140px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '80px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>04 — Writing</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>
        <div>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: 'var(--cream)',
            marginBottom: '24px',
          }}>
            Thoughts &<br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>ideas.</span>
          </h2>
          <p className="reveal" style={{
            fontFamily: 'var(--font-ui)', fontSize: '0.95rem', lineHeight: 1.8,
            color: 'var(--cream-dim)', marginBottom: '32px', transitionDelay: '0.1s',
          }}>
            I write about web development, software architecture, and the craft of building great products.
          </p>
          <Link to="/blog" className="reveal" data-hover style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--gold-dim)',
            paddingBottom: '3px',
            transition: 'border-color 0.3s',
            transitionDelay: '0.2s',
            display: 'inline-block',
          }}
            onMouseEnter={e => e.target.style.borderColor = 'var(--gold)'}
            onMouseLeave={e => e.target.style.borderColor = 'var(--gold-dim)'}>
            All Articles ↗
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {blogs.map((post, i) => (
            <Link to={`/blog/${post._id}`} key={post._id} className="reveal" data-hover
              style={{
                textDecoration: 'none',
                padding: '32px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '24px',
                alignItems: 'start',
                transition: 'all 0.3s',
                transitionDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => e.currentTarget.style.paddingLeft = '12px'}
              onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>

              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold-dim)', paddingTop: '4px', letterSpacing: '0.1em' }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  {post.tags?.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      letterSpacing: '0.12em',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                    }}>{t}</span>
                  ))}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: 'var(--cream)',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                }}>{post.title}</h3>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', color: 'var(--cream-dim)', lineHeight: 1.6 }}>
                  {post.excerpt}
                </p>
              </div>

              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gold-dim)', paddingTop: '4px', whiteSpace: 'nowrap' }}>
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
