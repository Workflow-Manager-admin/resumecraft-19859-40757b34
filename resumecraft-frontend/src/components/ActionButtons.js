import React, { useState } from "react";
import axios from "axios";
import "./ActionButtons.css";

function ActionButtons({ activeTab, data, templateId, previewHtml, backendUrl, onDataUpdate }) {
  const [checking, setChecking] = useState(false);
  const [grammarMsg, setGrammarMsg] = useState("");
  const [exporting, setExporting] = useState(false);

  async function handleGrammarCheck() {
    setChecking(true);
    setGrammarMsg("");
    let text = "";
    // Gather all text fields for resume or use entire cover letter body
    if (activeTab === "resume") {
      text =
        (data.name || "") + " " + (data.email || "") + " " + (data.phone || "") +
        " " + (data.education || []).map(e => Object.values(e).join(" ")).join(". ") +
        " " + (data.experience || []).map(e => Object.values(e).join(" ")).join(". ") +
        " " + (data.skills || []).join(", ");
    } else {
      text = Object.values(data || {}).join("\n");
    }
    try {
      const res = await axios.post(`${backendUrl}/grammar-check`, { text });
      if (res.data.issues && res.data.issues.length > 0) {
        setGrammarMsg(res.data.issues.map((i, idx) => <div key={idx}>{i.message}</div>));
      } else {
        setGrammarMsg("No grammar issues found.");
      }
      // If there's a corrected field and it's different, update the form content
      if (res.data.corrected && res.data.corrected !== text) {
        if (activeTab === "coverLetter") {
          onDataUpdate(d => ({ ...d, body: res.data.corrected }));
        }
      }
    } catch (err) {
      setGrammarMsg("Error contacting grammar API");
    }
    setChecking(false);
  }

  async function handlePdfExport() {
    setExporting(true);
    try {
      const res = await axios.post(`${backendUrl}/export-pdf`,
        { document: previewHtml, fileName: `${activeTab}_${Date.now()}` },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${activeTab}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setGrammarMsg("PDF exported!");
    } catch (err) {
      setGrammarMsg("PDF export failed");
    }
    setExporting(false);
  }

  // Disable if not enough info
  const disabled = !templateId || (activeTab === "resume" &&
    (!data.name || !data.email));

  return (
    <div className="rc-actions">
      <button type="button" disabled={disabled} onClick={handleGrammarCheck}>
        {checking ? "Checking..." : "Grammar Check"}
      </button>
      <button type="button" disabled={disabled || exporting} onClick={handlePdfExport}>
        {exporting ? "Exporting..." : "Export as PDF"}
      </button>
      <div className="rc-action-status">{grammarMsg}</div>
    </div>
  );
}

export default ActionButtons;
