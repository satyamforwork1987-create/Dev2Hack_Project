import { useState, useRef } from "react";
import axiosInstance from "../api/axios";

/**
 * FileUpload — Drag & drop statement upload for NOVA AI
 * Clean cream & white aesthetic with crisp SVG iconography
 */
const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);
    setResult(null);
    if (e.dataTransfer.files[0]) validateAndSet(e.dataTransfer.files[0]);
  };

  const validateAndSet = (f) => {
    const ext = f.name.split(".").pop().toLowerCase();
    if (ext !== "csv") {
      setError("Only CSV statement files are supported.");
      return;
    }
    if (f.size > 50 * 1024 * 1024) {
      setError("File must be under 50MB.");
      return;
    }
    setFile(f);
    setError(null);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("statement", file);

    try {
      const res = await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 300000,
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      setResult(res.data);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      if (onUploadSuccess) onUploadSuccess(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Upload failed. Please check the file and try again."
      );
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const formatSize = (b) =>
    b < 1024 ? b + " B" : b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(1) + " MB";

  return (
    <div>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        id="file-drop-zone"
        className="nova-card"
        style={{
          border: `2px dashed ${dragActive ? "var(--primary)" : "var(--border-dark)"}`,
          padding: "48px 24px",
          textAlign: "center",
          cursor: uploading ? "default" : "pointer",
          transition: "all 0.2s ease",
          background: dragActive ? "var(--surface-cream)" : "#FFFFFF",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: "var(--surface-cream)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
          {dragActive ? "Drop your statement file here" : "Drag & drop your bank statement"}
        </p>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>
          Accepts any bank statement in CSV format • Max 50MB
        </p>
        <span
          style={{
            fontSize: "12px",
            color: "var(--primary)",
            fontWeight: 600,
            background: "var(--surface-cream)",
            padding: "4px 12px",
            borderRadius: "6px",
            display: "inline-block",
          }}
        >
          Browse Files
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={(e) => {
            if (e.target.files[0]) validateAndSet(e.target.files[0]);
          }}
          style={{ display: "none" }}
          id="file-input"
        />
      </div>

      {/* Selected File Card */}
      {file && (
        <div
          className="nova-card animate-fade-in"
          style={{
            marginTop: "16px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", overflow: "hidden" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "var(--surface-cream)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div style={{ overflow: "hidden" }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {file.name}
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {formatSize(file.size)}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            disabled={uploading}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              alignItems: "center",
            }}
            title="Remove file"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div style={{ marginTop: "16px" }} className="animate-fade-in">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "6px",
            }}
          >
            <span>Uploading & running AI anomaly audit...</span>
            <span>{progress}%</span>
          </div>
          <div
            style={{
              height: "6px",
              borderRadius: "4px",
              background: "var(--border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "var(--primary)",
                borderRadius: "4px",
                transition: "width 0.2s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Upload Button */}
      {file && !uploading && (
        <button
          onClick={handleUpload}
          className="solid-btn animate-fade-in"
          id="upload-submit-btn"
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "14px",
            fontSize: "14px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Audit & Analyze Statement
        </button>
      )}

      {/* Error Message */}
      {error && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: "16px",
            padding: "14px 18px",
            borderRadius: "10px",
            background: "var(--risk-high-bg)",
            border: "1px solid var(--risk-high-border)",
            color: "var(--risk-high)",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      {/* Success Result Summary */}
      {result && (
        <div
          className="nova-card animate-fade-in"
          style={{
            marginTop: "16px",
            padding: "20px",
            background: "#FFFFFF",
            border: "1px solid var(--risk-normal-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "var(--risk-normal-bg)",
                color: "var(--risk-normal)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--risk-normal)" }}>
              Statement Successfully Processed
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              textAlign: "center",
              padding: "12px",
              background: "var(--surface-cream)",
              borderRadius: "8px",
            }}
          >
            <div>
              <p style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-primary)" }}>
                {result.totalProcessed}
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Transactions</p>
            </div>
            <div>
              <p style={{ fontSize: "18px", fontWeight: 800, color: "var(--risk-normal)" }}>
                {result.riskDistribution?.Normal || 0}
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Normal</p>
            </div>
            <div>
              <p style={{ fontSize: "18px", fontWeight: 800, color: "var(--risk-high)" }}>
                {(result.riskDistribution?.High || 0) + (result.riskDistribution?.Medium || 0)}
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Anomalies Flagged</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
