import { Link, useNavigate } from "react-router-dom";

/**
 * Navbar — Top navigation bar for NOVA AI
 * Solid cream aesthetic with clean SVG branding and tactile buttons
 */
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "0 36px",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border)",
        background: "rgba(249, 246, 240, 0.96)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Brand Logo with SVG */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            boxShadow: "0 2px 6px rgba(15, 42, 74, 0.2)",
          }}
        >
          {/* NOVA Star SVG */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontSize: "19px",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.5px",
                fontFamily: "inherit",
              }}
            >
              NOVA
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                background: "var(--primary)",
                color: "#FFFFFF",
                padding: "2px 6px",
                borderRadius: "5px",
                letterSpacing: "0.5px",
              }}
            >
              AI
            </span>
          </div>
          <span
            style={{
              fontSize: "10px",
              color: "var(--text-muted)",
              fontWeight: 500,
              display: "block",
              letterSpacing: "0.2px",
              marginTop: "-2px",
            }}
          >
            Financial Intelligence
          </span>
        </div>
      </Link>

      {/* Right-side navigation links & actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {token ? (
          <>
            <Link
              to="/upload"
              className="secondary-btn"
              style={{
                textDecoration: "none",
                padding: "8px 16px",
                fontSize: "13px",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload
            </Link>
            <Link
              to="/dashboard"
              className="secondary-btn"
              style={{
                textDecoration: "none",
                padding: "8px 16px",
                fontSize: "13px",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9" />
                <rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" />
                <rect x="3" y="16" width="7" height="5" />
              </svg>
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--danger)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--risk-high-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="secondary-btn"
              style={{
                textDecoration: "none",
                padding: "9px 18px",
                fontSize: "13px",
              }}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="solid-btn"
              style={{
                textDecoration: "none",
                padding: "9px 18px",
                fontSize: "13px",
              }}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
