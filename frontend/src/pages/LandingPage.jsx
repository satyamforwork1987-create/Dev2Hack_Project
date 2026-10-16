import { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";

/* ===== Animated Counter Hook ===== */
const useCounter = (target, duration = 1800) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};

/* ===== Features with Clean Professional SVGs ===== */
const features = [
  {
    title: "Statistical Anomaly Detection",
    desc: "Behavioral Z-score models evaluate spending divergence, novel merchant novelty, and unexpected spikes without black-box opacity.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: "Universal Statement Parser",
    desc: "Ingests raw bank and credit card CSV exports with dynamic header matching for date, debit, credit, and narration fields.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "AI Semantic Categorization",
    desc: "Translates cryptic merchant abbreviations into standardized spending buckets (Food, Utilities, Healthcare, Shopping) in real time.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Secure Isolated Workspaces",
    desc: "Zero cross-user exposure. Your transactions and analytical insights are strictly bounded to your private tenant ID.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

/* ===== 4-Step Pipeline ===== */
const steps = [
  {
    step: "01",
    title: "Create Account",
    desc: "Set up a private, isolated workspace in seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Upload Statement",
    desc: "Drop your bank or UPI transaction CSV file directly.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Intelligent Audit",
    desc: "Automated column mapping, normalization & Gemini AI classification.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Explore Dashboard",
    desc: "Audit flagged anomalies, risk distribution, and categorical trends.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
  },
];

/* ===== Stat Card ===== */
const StatCard = ({ value, suffix, label }) => {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="nova-card" style={{ padding: "24px 20px", textAlign: "center" }}>
      <div
        style={{
          fontSize: "36px",
          fontWeight: 800,
          color: "var(--text-primary)",
          lineHeight: 1.1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}
        <span style={{ fontSize: "24px", color: "var(--primary)" }}>{suffix}</span>
      </div>
      <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "8px", fontWeight: 600 }}>
        {label}
      </p>
    </div>
  );
};

/* ===== Main Landing Page Component ===== */
const LandingPage = () => {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/dashboard" replace />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface)", color: "var(--text-primary)" }}>

      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          padding: "70px 24px 60px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* Left Column: Heading and Value Proposition */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "20px",
              background: "#FFFFFF",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
              marginBottom: "20px",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--risk-normal)" }} />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Enterprise Statement Auditing
            </span>
          </div>

          <h1
            style={{
              fontSize: "46px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "var(--text-primary)",
              letterSpacing: "-1px",
              marginBottom: "18px",
            }}
          >
            Bank statement intelligence built for precision and clarity.
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "32px",
              maxWidth: "540px",
            }}
          >
            <strong style={{ color: "var(--text-primary)" }}>NOVA AI</strong> parses bank statements, detects statistical behavioral outliers, and semantically categorizes transactions — giving you clean, explainable audits.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              to="/register"
              className="solid-btn"
              style={{
                textDecoration: "none",
                padding: "14px 28px",
                fontSize: "15px",
              }}
            >
              Get Started Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <Link
              to="/login"
              className="secondary-btn"
              style={{
                textDecoration: "none",
                padding: "14px 24px",
                fontSize: "15px",
              }}
            >
              Sign In to Workspace
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "24px", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--risk-normal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>CSV Bank Exports</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--risk-normal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>Explainable Z-Scores</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--risk-normal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>No Black Box</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero SVG Illustration (Editorial Banking UI Card) */}
        <div>
          <div
            className="nova-card"
            style={{
              padding: "28px",
              background: "#FFFFFF",
              position: "relative",
            }}
          >
            {/* Header of Simulated Audit */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--primary)", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>NOVA Statement Audit</p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>HDFC_Mar2024_Export.csv</p>
                </div>
              </div>
              <span style={{ fontSize: "11px", fontWeight: 700, background: "var(--risk-normal-bg)", color: "var(--risk-normal)", padding: "3px 9px", borderRadius: "20px", border: "1px solid var(--risk-normal-border)" }}>
                Verified 100%
              </span>
            </div>

            {/* Graphic SVG Diagram: Banking ledger with Anomaly Highlight */}
            <svg width="100%" height="160" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Row 1 - Normal */}
              <rect x="0" y="5" width="400" height="42" rx="6" fill="#FBF9F5" stroke="#E8E2D6" />
              <circle cx="20" cy="26" r="5" fill="#15803D" />
              <text x="36" y="24" fill="#1C1917" fontSize="12" fontWeight="600" fontFamily="sans-serif">Monthly Salary Credit</text>
              <text x="36" y="38" fill="#78716C" fontSize="10" fontFamily="sans-serif">Tech Corp • Verified Income</text>
              <text x="385" y="30" fill="#15803D" fontSize="12" fontWeight="700" textAnchor="end" fontFamily="sans-serif">+ ₹1,25,000</text>

              {/* Row 2 - High Risk Anomaly */}
              <rect x="0" y="55" width="400" height="46" rx="6" fill="#FEE2E2" stroke="#FECACA" strokeWidth="1.5" />
              <circle cx="20" cy="78" r="5" fill="#B91C1C" />
              <text x="36" y="74" fill="#991B1B" fontSize="12" fontWeight="700" fontFamily="sans-serif">Crypto Wire Transfer Unknown</text>
              <text x="36" y="90" fill="#B91C1C" fontSize="10" fontWeight="600" fontFamily="sans-serif">⚠️ Anomaly Score: 85 • Extreme Z-Score</text>
              <text x="385" y="82" fill="#B91C1C" fontSize="13" fontWeight="800" textAnchor="end" fontFamily="sans-serif">- ₹95,000</text>

              {/* Row 3 - Normal Grocery */}
              <rect x="0" y="110" width="400" height="42" rx="6" fill="#FBF9F5" stroke="#E8E2D6" />
              <circle cx="20" cy="131" r="5" fill="#15803D" />
              <text x="36" y="129" fill="#1C1917" fontSize="12" fontWeight="600" fontFamily="sans-serif">Zepto Daily Groceries</text>
              <text x="36" y="143" fill="#78716C" fontSize="10" fontFamily="sans-serif">Categorized: Groceries • Normal</text>
              <text x="385" y="135" fill="#1C1917" fontSize="12" fontWeight="700" textAnchor="end" fontFamily="sans-serif">- ₹430</text>
            </svg>

            {/* KPI metric pill footer inside card */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
              <div style={{ background: "var(--surface-cream)", padding: "10px", borderRadius: "8px" }}>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>PARSED</p>
                <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary)" }}>30 Txns</p>
              </div>
              <div style={{ background: "var(--surface-cream)", padding: "10px", borderRadius: "8px" }}>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>NORMAL</p>
                <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--risk-normal)" }}>26 Safe</p>
              </div>
              <div style={{ background: "var(--surface-cream)", padding: "10px", borderRadius: "8px" }}>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>FLAGGED</p>
                <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--risk-high)" }}>4 Alerts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== METRICS ROW ===== */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 60px", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          <StatCard value={15000} suffix="+" label="Statement Rows Audited" />
          <StatCard value={99} suffix="%" label="Column Match Precision" />
          <StatCard value={256} suffix="-bit" label="Encrypted Tenant Isolation" />
          <StatCard value={2} suffix="s" label="Average Ingestion Speed" />
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 70px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Capabilities
          </span>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "var(--text-primary)", marginTop: "6px", letterSpacing: "-0.5px" }}>
            Engineered for genuine financial intelligence
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginTop: "8px", maxWidth: "600px", margin: "8px auto 0" }}>
            Combining rigorous statistical deviation tests with Google Gemini AI reasoning for clear, human-understandable audit reports.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {features.map((f) => (
            <div key={f.title} className="nova-card" style={{ padding: "28px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "var(--surface-cream)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS PIPELINE ===== */}
      <section style={{ background: "var(--surface-cream)", padding: "60px 24px", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "70px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
              Workflow
            </span>
            <h2 style={{ fontSize: "30px", fontWeight: 800, color: "var(--text-primary)", marginTop: "6px", letterSpacing: "-0.5px" }}>
              How NOVA AI audits your finances
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {steps.map((s) => (
              <div key={s.step} className="nova-card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--primary)", background: "var(--surface-cream)", padding: "3px 8px", borderRadius: "5px" }}>
                    {s.step}
                  </span>
                  <div style={{ color: "var(--text-muted)" }}>{s.icon}</div>
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION FOOTER ===== */}
      <section style={{ maxWidth: "800px", margin: "0 auto 80px", padding: "0 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.5px", marginBottom: "12px" }}>
          Ready to audit your bank statements?
        </h2>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "28px", lineHeight: 1.6 }}>
          Join individuals and financial analysts using NOVA AI to maintain proactive financial vigilance.
        </p>
        <Link
          to="/register"
          className="solid-btn"
          style={{
            textDecoration: "none",
            padding: "14px 32px",
            fontSize: "15px",
          }}
        >
          Create Free Account
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </section>

      {/* ===== SIMPLE EDITORIAL FOOTER ===== */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "28px 24px",
          background: "#FFFFFF",
          textAlign: "center",
          fontSize: "13px",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontWeight: 800, color: "var(--text-primary)" }}>NOVA AI</span>
          <span>•</span>
          <span>Financial Intelligence Platform</span>
        </div>
        <p>© {new Date().getFullYear()} NOVA AI. All financial statements processed securely.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
