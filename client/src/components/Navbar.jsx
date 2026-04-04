import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = ['About', 'Projects', 'Skills', 'Blog', 'Contact']

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
          &lt;YourName /&gt;
        </Link>
        {/* Desktop */}
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l}>
              {l === 'Blog' ? (
                <Link to="/blog" className="text-gray-600 hover:text-gray-900 font-medium transition">{l}</Link>
              ) : (
                <a href={`#${l.toLowerCase()}`} className="text-gray-600 hover:text-gray-900 font-medium transition">{l}</a>
              )}
            </li>
          ))}
          <li>
            <a href="/resume.pdf" download className="bg-gray-900 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-700 transition">
              Resume
            </a>
          </li>
        </ul>
        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l} href={l === 'Blog' ? '/blog' : `#${l.toLowerCase()}`}
              className="text-gray-700 font-medium" onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href="/resume.pdf" download className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium text-center">Resume</a>
        </div>
      )}
    </nav>
  )
}