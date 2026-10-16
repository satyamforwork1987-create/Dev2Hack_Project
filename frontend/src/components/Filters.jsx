/**
 * Filters — Risk level, date range, category filtering for NOVA AI
 * Clean cream & white styling
 */
const Filters = ({ filters, onChange, categories }) => {
  const riskLevels = ["All", "Normal", "Medium", "High"];

  const selectStyle = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    background: "#FFFFFF",
    color: "var(--text-primary)",
    fontSize: "13px",
    fontFamily: "inherit",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.2s",
    minWidth: "130px",
  };

  const inputStyle = {
    ...selectStyle,
    colorScheme: "light",
  };

  return (
    <div
      className="nova-card animate-fade-in"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        alignItems: "center",
        marginBottom: "20px",
        padding: "16px 20px",
      }}
    >
      {/* Label with SVG Icon */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "4px" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--text-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.6px",
          }}
        >
          Filters
        </span>
      </div>

      {/* Risk Level */}
      <select
        value={filters.riskLevel}
        onChange={(e) => onChange("riskLevel", e.target.value)}
        id="filter-risk"
        style={selectStyle}
      >
        <option value="All">All Risk Levels</option>
        {riskLevels
          .filter((l) => l !== "All")
          .map((level) => (
            <option key={level} value={level}>
              {level} Risk
            </option>
          ))}
      </select>

      {/* Category */}
      <select
        value={filters.category}
        onChange={(e) => onChange("category", e.target.value)}
        id="filter-category"
        style={selectStyle}
      >
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Date From */}
      <input
        type="date"
        value={filters.dateFrom}
        onChange={(e) => onChange("dateFrom", e.target.value)}
        id="filter-date-from"
        style={inputStyle}
        title="From date"
      />

      {/* Date To */}
      <input
        type="date"
        value={filters.dateTo}
        onChange={(e) => onChange("dateTo", e.target.value)}
        id="filter-date-to"
        style={inputStyle}
        title="To date"
      />

      {/* Reset */}
      {(filters.riskLevel !== "All" ||
        filters.category !== "All" ||
        filters.dateFrom ||
        filters.dateTo) && (
        <button
          onClick={() => {
            onChange("riskLevel", "All");
            onChange("category", "All");
            onChange("dateFrom", "");
            onChange("dateTo", "");
          }}
          id="filter-reset"
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--danger)",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Reset
        </button>
      )}
    </div>
  );
};

export default Filters;
