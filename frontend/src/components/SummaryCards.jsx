/**
 * SummaryCards — KPI Cards for NOVA AI
 * Clean cream/white design with crisp inline SVGs (no emojis)
 */
const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  const { totalTransactions, summary: typeSummary } = summary;

  // Sum all types for total volume
  const totalVolume = typeSummary?.reduce((sum, s) => sum + Math.abs(s.total), 0) || 0;
  const avgValue = totalTransactions > 0 ? totalVolume / totalTransactions : 0;

  // Count risk levels
  const highRisk = summary.riskCounts?.High || 0;
  const mediumRisk = summary.riskCounts?.Medium || 0;

  const formatINR = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const cards = [
    {
      label: "Total Transactions",
      value: totalTransactions?.toLocaleString("en-IN") || "0",
      subtext: "Parsed & verified",
      badgeColor: "var(--primary)",
      badgeBg: "var(--surface-cream)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      label: "Total Volume",
      value: formatINR(totalVolume),
      subtext: "Gross cashflow",
      badgeColor: "var(--text-primary)",
      badgeBg: "var(--surface-cream)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
    {
      label: "Average Transaction",
      value: formatINR(avgValue),
      subtext: "Per transaction mean",
      badgeColor: "var(--accent)",
      badgeBg: "#CCFBF1",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
    },
    {
      label: "High Risk Flags",
      value: highRisk.toString(),
      subtext: "Critical anomalies",
      badgeColor: "var(--risk-high)",
      badgeBg: "var(--risk-high-bg)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      label: "Medium Risk Flags",
      value: mediumRisk.toString(),
      subtext: "Moderate deviation",
      badgeColor: "var(--risk-medium)",
      badgeBg: "var(--risk-medium-bg)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "28px",
      }}
      className="animate-fade-in"
    >
      {cards.map((card) => (
        <div
          key={card.label}
          className="nova-card"
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
              }}
            >
              {card.label}
            </p>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: card.badgeBg,
                color: card.badgeColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {card.icon}
            </div>
          </div>
          <div>
            <p
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "var(--text-primary)",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1.1,
              }}
            >
              {card.value}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                marginTop: "6px",
                fontWeight: 500,
              }}
            >
              {card.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
