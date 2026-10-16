import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import SummaryCards from "../components/SummaryCards";
import Filters from "../components/Filters";
import TransactionTable from "../components/TransactionTable";
import Charts from "../components/Charts";

/**
 * Dashboard — Financial Intelligence Overview for NOVA AI
 * Solid cream background, clean white cards, crisp typography
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    riskLevel: "All",
    category: "All",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [txRes, summaryRes] = await Promise.all([
        axiosInstance.get("/transactions?limit=5000&order=desc"),
        axiosInstance.get("/transactions/summary"),
      ]);

      const txData = txRes.data.data?.transactions || [];
      setTransactions(txData);

      const riskCounts = { Normal: 0, Medium: 0, High: 0 };
      txData.forEach((tx) => {
        riskCounts[tx.riskLevel] = (riskCounts[tx.riskLevel] || 0) + 1;
      });

      setSummary({
        ...summaryRes.data.data,
        riskCounts,
      });
    } catch (err) {
      setError("Failed to load data. Is the backend running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, val) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  // Client-side filtering
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (filters.riskLevel !== "All" && tx.riskLevel !== filters.riskLevel)
        return false;
      if (filters.category !== "All" && tx.category !== filters.category)
        return false;
      if (filters.dateFrom) {
        const from = new Date(filters.dateFrom);
        if (new Date(tx.date) < from) return false;
      }
      if (filters.dateTo) {
        const to = new Date(filters.dateTo);
        to.setHours(23, 59, 59);
        if (new Date(tx.date) > to) return false;
      }
      return true;
    });
  }, [transactions, filters]);

  const categories = useMemo(() => {
    const cats = new Set(transactions.map((tx) => tx.category).filter(Boolean));
    return [...cats].sort();
  }, [transactions]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 68px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--surface)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "3px solid var(--border)",
              borderTopColor: "var(--primary)",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
              margin: "0 auto 14px",
            }}
          />
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
            Loading statement intelligence...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "calc(100vh - 68px)", background: "var(--surface)", padding: "32px 0 60px" }}>
      <main
        style={{
          maxWidth: "1220px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Page Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "28px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Auditing Workspace
              </span>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--border-dark)" }} />
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Active Statement Batch
              </span>
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.5px",
              }}
            >
              Financial Intelligence Dashboard
            </h1>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={fetchData}
              id="refresh-btn"
              className="secondary-btn"
              style={{ padding: "9px 16px", fontSize: "13px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Refresh
            </button>
            <button
              onClick={() => navigate("/upload")}
              id="nav-upload"
              className="solid-btn"
              style={{ padding: "9px 18px", fontSize: "13px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Statement
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div
            className="animate-fade-in"
            style={{
              padding: "14px 18px",
              borderRadius: "10px",
              background: "var(--risk-high-bg)",
              border: "1px solid var(--risk-high-border)",
              color: "var(--risk-high)",
              fontSize: "13px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* 1. Summary Cards */}
        <SummaryCards summary={summary} />

        {/* 2. Visual Charts */}
        <Charts transactions={filteredTransactions} />

        {/* 3. Filters */}
        <Filters
          filters={filters}
          onChange={handleFilterChange}
          categories={categories}
        />

        {/* 4. Transactions Ledger */}
        <TransactionTable transactions={filteredTransactions} />
      </main>
    </div>
  );
};

export default Dashboard;
