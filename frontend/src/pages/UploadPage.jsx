import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";

/**
 * UploadPage — Bank Statement Upload for NOVA AI
 * Clean cream & white layout with clear instructions
 */
const UploadPage = () => {
  const navigate = useNavigate();

  const handleSuccess = (data) => {
    setTimeout(() => navigate("/dashboard"), 1400);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 68px)", background: "var(--surface)", padding: "48px 24px" }}>
      <main
        style={{
          maxWidth: "540px",
          margin: "0 auto",
        }}
      >
        <div className="animate-slide-up">
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--primary)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                background: "var(--surface-cream)",
                padding: "4px 12px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "12px",
                border: "1px solid var(--border)",
              }}
            >
              Document Intake
            </span>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "8px",
                letterSpacing: "-0.5px",
              }}
            >
              Upload Bank Statement
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              Upload any bank or credit card CSV statement. NOVA AI automatically normalizes columns, categorizes line items, and runs statistical behavioral anomaly checks.
            </p>
          </div>

          <FileUpload onUploadSuccess={handleSuccess} />

          {/* Supported Features Checklist */}
          <div
            className="nova-card"
            style={{
              marginTop: "24px",
              padding: "18px 20px",
              background: "#FFFFFF",
            }}
          >
            <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>
              Automated Pipeline Verification
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                "Universal column matching",
                "Gemini AI semantic tagging",
                "Z-score outlier detection",
                "Isolated user workspace",
              ].map((feat) => (
                <div key={feat} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--risk-normal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
