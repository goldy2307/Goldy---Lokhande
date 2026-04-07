import { useState, useEffect, useRef } from 'react'
import { sendMessage } from '../api/index'

export default function Contact() {
  const ref = useRef()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('') // sending | success | error
  const [focused, setFocused] = useState('')

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(e => e.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible') }), { threshold: 0.1 })
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await sendMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} style={{ padding: '140px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '80px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>05 — Contact</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'start' }}>
        {/* Left */}
        <div>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: 'var(--cream)',
            marginBottom: '32px',
          }}>
            Let's build<br />
            something<br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>remarkable.</span>
          </h2>

          <p className="reveal" style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1rem',
            lineHeight: 1.8,
            color: 'var(--cream-dim)',
            marginBottom: '48px',
            transitionDelay: '0.1s',
          }}>
            Whether you have a project in mind, an opportunity to discuss, or just want to connect — my inbox is always open.
          </p>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '20px', transitionDelay: '0.2s' }}>
            {[
              { label: 'Email', value: 'hello@yourname.dev', href: 'mailto:hello@yourname.dev' },
              { label: 'GitHub', value: 'github.com/yourname', href: 'https://github.com' },
              { label: 'LinkedIn', value: 'linkedin.com/in/yourname', href: 'https://linkedin.com' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" data-hover
                style={{ display: 'flex', gap: '20px', alignItems: 'center', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'rgba(201,168,76,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.06)'}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--gold-dim)', textTransform: 'uppercase', width: '60px' }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--cream-dim)' }}>{item.value}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--gold-dim)', fontSize: '0.8rem' }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="reveal" style={{ transitionDelay: '0.15s' }}>
          {status === 'success' ? (
            <div style={{
              border: '1px solid rgba(201,168,76,0.25)',
              padding: '60px 40px',
              textAlign: 'center',
              animation: 'fadeInUp 0.5s ease',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>✦</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, color: 'var(--cream)', marginBottom: '12px' }}>Message received.</h3>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', color: 'var(--cream-dim)', marginBottom: '32px' }}>I'll get back to you within 24 hours.</p>
              <button onClick={() => setStatus('')} data-hover style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em',
                color: 'var(--gold)', background: 'none', border: '1px solid var(--gold)',
                padding: '10px 24px', cursor: 'none', textTransform: 'uppercase', transition: 'all 0.3s',
              }}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { id: 'name', label: 'Your Name', type: 'text', required: true },
                { id: 'email', label: 'Email Address', type: 'email', required: true },
              ].map(field => (
                <div key={field.id} style={{ position: 'relative', marginBottom: '0' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: focused === field.id ? 'var(--gold)' : 'var(--gold-dim)',
                    textTransform: 'uppercase',
                    padding: '20px 0 6px',
                    transition: 'color 0.3s',
                  }}>{field.label}</label>
                  <input
                    type={field.type}
                    required={field.required}
                    value={form[field.id]}
                    onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused('')}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `1px solid ${focused === field.id ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.1)'}`,
                      color: 'var(--cream)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '1rem',
                      padding: '8px 0 16px',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                      cursor: 'none',
                    }}
                  />
                </div>
              ))}

              {/* Textarea */}
              <div style={{ position: 'relative' }}>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: focused === 'message' ? 'var(--gold)' : 'var(--gold-dim)',
                  textTransform: 'uppercase',
                  padding: '20px 0 6px',
                  transition: 'color 0.3s',
                }}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `1px solid ${focused === 'message' ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.1)'}`,
                    color: 'var(--cream)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '1rem',
                    padding: '8px 0 16px',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.3s',
                    cursor: 'none',
                  }}
                />
              </div>

              <button type="submit" disabled={status === 'sending'} data-hover
                style={{
                  marginTop: '40px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--obsidian)',
                  background: 'var(--gold)',
                  border: 'none',
                  padding: '18px 40px',
                  cursor: 'none',
                  alignSelf: 'flex-start',
                  transition: 'all 0.3s',
                  opacity: status === 'sending' ? 0.6 : 1,
                }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = 'var(--gold-light)' }}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}>
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>

              {status === 'error' && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#f87171', marginTop: '12px' }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
