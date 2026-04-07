import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getBlogs } from '../api/index'

const demoBlogs = [
  { _id: '1', title: 'Building Scalable REST APIs with Node.js and Express', excerpt: 'A deep dive into architecture patterns, rate limiting, caching strategies.', date: '2024-03-15', tags: ['Node.js', 'Backend'] },
  { _id: '2', title: 'The Art of State Management in React 19', excerpt: 'Exploring useState, useReducer, Context, Zustand, and React Query.', date: '2024-02-20', tags: ['React', 'Frontend'] },
  { _id: '3', title: 'MongoDB Performance: Indexing Strategies That Matter', excerpt: 'How compound indexes and aggregation pipelines can make or break your app.', date: '2024-01-10', tags: ['MongoDB', 'Database'] },
  { _id: '4', title: 'JWT Auth Done Right: Security Patterns for Node APIs', excerpt: 'Token rotation, refresh tokens, blacklisting, and secure cookie storage.', date: '2023-12-05', tags: ['Security', 'Backend'] },
]

export default function BlogList() {
  const { data, isLoading } = useQuery({ queryKey: ['blogs'], queryFn: getBlogs, retry: false })
  const blogs = data?.data?.length ? data.data : demoBlogs

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 80px 120px' }}>
        {/* Header */}
        <div style={{ marginBottom: '80px' }}>
          <Link to="/" style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em',
            color: 'var(--gold-dim)', textDecoration: 'none', textTransform: 'uppercase',
            display: 'inline-block', marginBottom: '40px',
          }}>← Home</Link>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1,
            color: 'var(--cream)',
            marginBottom: '16px',
          }}>
            Writing<span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '1rem', color: 'var(--cream-dim)', lineHeight: 1.7 }}>
            Thoughts on development, architecture, and the craft of building great software.
          </p>
        </div>

        {isLoading ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-dim)', letterSpacing: '0.15em' }}>
            Loading...
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {blogs.map((post, i) => (
              <Link to={`/blog/${post._id}`} key={post._id} data-hover
                style={{
                  textDecoration: 'none',
                  padding: '48px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: '32px',
                  transition: 'padding-left 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft = '16px'}
                onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>

                <div style={{ paddingTop: '6px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--gold-dim)', letterSpacing: '0.15em', marginBottom: '4px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--gold-dim)', letterSpacing: '0.1em', lineHeight: 1.5 }}>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {post.tags?.map(t => (
                      <span key={t} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                        letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase',
                        border: '1px solid rgba(201,168,76,0.3)', padding: '2px 8px',
                      }}>{t}</span>
                    ))}
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
                    fontWeight: 400,
                    color: 'var(--cream)',
                    lineHeight: 1.25,
                    marginBottom: '12px',
                  }}>{post.title}</h2>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', color: 'var(--cream-dim)', lineHeight: 1.7 }}>
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
