/**
 * RiskBadge — Color-coded risk level badge for NOVA AI
 * Clean solid cream/white palette with accessible contrast
 */
const RiskBadge = ({ level, score }) => {
  const config = {
    Normal: {
      bg: "var(--risk-normal-bg)",
      color: "var(--risk-normal)",
      border: "var(--risk-normal-border)",
    },
    Medium: {
      bg: "var(--risk-medium-bg)",
      color: "var(--risk-medium)",
      border: "var(--risk-medium-border)",
    },
    High: {
      bg: "var(--risk-high-bg)",
      color: "var(--risk-high)",
      border: "var(--risk-high-border)",
    },
  };

  const style = config[level] || config.Normal;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "4px 10px",
          borderRadius: "6px",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.4px",
          background: style.bg,
          color: style.color,
          border: `1px solid ${style.border}`,
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: style.color,
          }}
        />
        {level}
      </span>
      {score > 0 && (
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--text-muted)",
            background: "var(--surface-cream)",
            padding: "2px 6px",
            borderRadius: "4px",
            border: "1px solid var(--border)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          Score: {score}
        </span>
      )}
    </div>
  );
};

export default RiskBadge;
