import React, { useEffect, useState } from "react";
import { theme } from "./theme";
import TemplateSelector from "./components/TemplateSelector";
import ResumeForm from "./components/ResumeForm";
import CoverLetterForm from "./components/CoverLetterForm";
import DocumentPreview from "./components/DocumentPreview";
import ActionButtons from "./components/ActionButtons";
import "./App.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

function App() {
  const [activeTab, setActiveTab] = useState("resume");
  const [templateOptions, setTemplateOptions] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [resumeData, setResumeData] = useState({});
  const [coverData, setCoverData] = useState({});
  const [previewHtml, setPreviewHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch templates on mount
  useEffect(() => {
    fetch(`${backendUrl}/templates`)
      .then((r) => r.json())
      .then((data) => setTemplateOptions(data.templates || []));
  }, []);

  // Update preview on data/template change
  useEffect(() => {
    let formData = activeTab === "resume" ? resumeData : coverData;
    if (!templateId) return setPreviewHtml("<div style='padding:2em;color:#888'>Select a template to preview document.</div>");
    setIsLoading(true);
    fetch(`${backendUrl}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: activeTab,
        templateId,
        data: formData
      }),
    })
      .then((r) => r.json())
      .then((data) => setPreviewHtml(data.document || "<div />"))
      .finally(() => setIsLoading(false));
  }, [templateId, resumeData, coverData, activeTab]);

  // Handlers
  const handleTabSwitch = (tab) => setActiveTab(tab);
  const handleTemplateChange = (id) => setTemplateId(id);
  const handleResumeDataChange = (data) => setResumeData(data);
  const handleCoverDataChange = (data) => setCoverData(data);

  return (
    <div className="rc-app" style={{ background: theme.palette.background, color: theme.palette.text, minHeight: "100vh" }}>
      <header className="rc-header">
        <h1 style={{ color: theme.palette.primary }}>ResumeCraft</h1>
        <div className="rc-tabs">
          <button className={activeTab==="resume" ? "tab-active" : ""} onClick={() => handleTabSwitch("resume")}>Resume</button>
          <button className={activeTab==="coverLetter" ? "tab-active" : ""} onClick={() => handleTabSwitch("coverLetter")}>Cover Letter</button>
        </div>
      </header>

      <main className="rc-main">
        <section className="rc-left-panel">
          <TemplateSelector
            templates={templateOptions}
            selectedId={templateId}
            onSelect={handleTemplateChange}
            activeTab={activeTab}
          />
          {activeTab === "resume" ?
            <ResumeForm data={resumeData} setData={handleResumeDataChange} /> :
            <CoverLetterForm data={coverData} setData={handleCoverDataChange} />
          }
          <ActionButtons
            activeTab={activeTab}
            data={activeTab==="resume" ? resumeData : coverData}
            templateId={templateId}
            previewHtml={previewHtml}
            backendUrl={backendUrl}
            onDataUpdate={
              activeTab === "resume" ? setResumeData : setCoverData
            }
          />
        </section>
        <section className="rc-preview-panel">
          <h3 style={{margin:"10px 0", color: theme.palette.accent, fontWeight:400}}>Preview</h3>
          <div className="rc-preview-scroll" style={{background: "#24214c22", borderRadius: 8, overflow: "auto"}}>
            {isLoading ? <div style={{color:'#B39DDB',padding:'2em'}}>Rendering...</div> :
              <DocumentPreview html={previewHtml} />}
          </div>
        </section>
      </main>
      <footer className="rc-footer">
        <span style={{color:theme.palette.accent}}>Made with ResumeCraft • &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

export default App;
