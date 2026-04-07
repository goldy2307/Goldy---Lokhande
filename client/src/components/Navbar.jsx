import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "14px 48px" : "24px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,11,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(201,168,76,0.12)"
          : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* ✅ LOGO FIXED */}
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/goldy_name.png"
          alt="Goldy Logo"
          style={{
            height: "112px",        // 🔥 CONTROL SIZE HERE
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </Link>

      {/* Desktop links */}
      <ul
        style={{
          display: "flex",
          gap: "36px",
          listStyle: "none",
          alignItems: "center",
        }}
        className="hidden md:flex"
      >
        {navLinks.map((l) => (
          <li key={l.label}>
            {l.href.startsWith("/") ? (
              <Link
                to={l.href}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--gold)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--cream-dim)")
                }
              >
                {l.label}
              </Link>
            ) : (
              <a
                href={l.href}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--gold)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--cream-dim)")
                }
              >
                {l.label}
              </a>
            )}
          </li>
        ))}

        {/* Resume Button */}
        <li>
          <a
            href="/resume.pdf"
            download
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "var(--gold)",
              border: "1px solid var(--gold)",
              padding: "8px 18px",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--gold)";
              e.target.style.color = "black";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "var(--gold)";
            }}
          >
            Resume ↗
          </a>
        </li>
      </ul>

      {/* Mobile button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden"
        style={{
          background: "none",
          border: "none",
          color: "var(--gold)",
          fontSize: "1.4rem",
          cursor: "pointer",
        }}
      >
        {open ? "✕" : "≡"}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(10,10,11,0.97)",
            backdropFilter: "blur(20px)",
            padding: "32px 48px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ ...linkStyle, fontSize: "1.1rem" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

const linkStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.72rem",
  letterSpacing: "0.12em",
  color: "var(--cream-dim)",
  textDecoration: "none",
  textTransform: "uppercase",
  transition: "color 0.3s",
};