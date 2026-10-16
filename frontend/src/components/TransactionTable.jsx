import { useState } from "react";
import RiskBadge from "./RiskBadge";

/**
 * TransactionTable — Sortable, paginated transaction ledger for NOVA AI
 * Clean cream & white table styling with SVG icons
 */
const ROWS_PER_PAGE = 15;

const TransactionTable = ({ transactions }) => {
  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);

  // --- Sorting ---
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
    setPage(1);
  };

  const sorted = [...transactions].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];

    if (sortKey === "date") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    if (sortKey === "amount") {
      aVal = Math.abs(aVal);
      bVal = Math.abs(bVal);
    }
    if (sortKey === "riskLevel") {
      const order = { High: 3, Medium: 2, Normal: 1 };
      aVal = order[aVal] || 0;
      bVal = order[bVal] || 0;
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // --- Pagination ---
  const totalPages = Math.ceil(sorted.length / ROWS_PER_PAGE);
  const paginated = sorted.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatCurrency = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Math.abs(n));

  const SortIcon = ({ active, order }) => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        marginLeft: "4px",
        verticalAlign: "middle",
        color: active ? "var(--primary)" : "var(--text-muted)",
        transform: active && order === "asc" ? "rotate(180deg)" : "none",
        transition: "transform 0.15s",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  const headerStyle = {
    fontSize: "11px",
    fontWeight: 700,
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    cursor: "pointer",
    userSelect: "none",
    padding: "14px 0",
    display: "flex",
    alignItems: "center",
  };

  if (transactions.length === 0) {
    return (
      <div
        className="nova-card"
        style={{
          padding: "60px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "12px",
            background: "var(--surface-cream)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
          No transactions yet
        </p>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          Upload a bank statement CSV to audit transactions and detect anomalies.
        </p>
      </div>
    );
  }

  return (
    <div className="nova-card animate-fade-in" style={{ overflow: "hidden" }}>
      {/* Table Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr 140px 130px 120px 90px",
          gap: "12px",
          padding: "0 24px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface-cream)",
        }}
      >
        <div style={headerStyle} onClick={() => handleSort("date")}>
          Date <SortIcon active={sortKey === "date"} order={sortOrder} />
        </div>
        <div style={{ ...headerStyle, cursor: "default" }}>Description</div>
        <div style={headerStyle} onClick={() => handleSort("category")}>
          Category <SortIcon active={sortKey === "category"} order={sortOrder} />
        </div>
        <div
          style={{ ...headerStyle, justifyContent: "flex-end" }}
          onClick={() => handleSort("amount")}
        >
          Amount <SortIcon active={sortKey === "amount"} order={sortOrder} />
        </div>
        <div style={headerStyle} onClick={() => handleSort("riskLevel")}>
          Risk <SortIcon active={sortKey === "riskLevel"} order={sortOrder} />
        </div>
        <div
          style={{ ...headerStyle, justifyContent: "flex-end" }}
          onClick={() => handleSort("anomalyScore")}
        >
          Score <SortIcon active={sortKey === "anomalyScore"} order={sortOrder} />
        </div>
      </div>

      {/* Rows */}
      {paginated.map((tx, i) => (
        <div
          key={tx._id || i}
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr 140px 130px 120px 90px",
            gap: "12px",
            padding: "14px 24px",
            borderBottom: i < paginated.length - 1 ? "1px solid var(--border)" : "none",
            transition: "background 0.12s",
            alignItems: "center",
            background: "#FFFFFF",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-card-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
        >
          {/* Date */}
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>
            {formatDate(tx.date)}
          </span>

          {/* Description */}
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {tx.description || "—"}
          </span>

          {/* Category */}
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              background: "var(--surface-cream)",
              padding: "3px 8px",
              borderRadius: "5px",
              width: "fit-content",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {tx.category || "Others"}
          </span>

          {/* Amount */}
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              textAlign: "right",
              fontVariantNumeric: "tabular-nums",
              color: tx.type === "credit" ? "var(--risk-normal)" : "var(--text-primary)",
            }}
          >
            {tx.type === "credit" ? "+ " : "- "}
            {formatCurrency(tx.amount)}
          </span>

          {/* Risk Level */}
          <div>
            <RiskBadge level={tx.riskLevel} score={0} />
          </div>

          {/* Anomaly Score */}
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              textAlign: "right",
              fontVariantNumeric: "tabular-nums",
              color: tx.anomalyScore >= 60 ? "var(--risk-high)" : tx.anomalyScore >= 30 ? "var(--risk-medium)" : "var(--text-muted)",
            }}
          >
            {tx.anomalyScore || 0}
          </span>
        </div>
      ))}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 24px",
            borderTop: "1px solid var(--border)",
            background: "var(--surface-cream)",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Showing {(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, sorted.length)} of {sorted.length} transactions
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="secondary-btn"
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                opacity: page === 1 ? 0.5 : 1,
                cursor: page === 1 ? "default" : "pointer",
              }}
            >
              Previous
            </button>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", alignSelf: "center", padding: "0 6px" }}>
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="secondary-btn"
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                opacity: page === totalPages ? 0.5 : 1,
                cursor: page === totalPages ? "default" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
