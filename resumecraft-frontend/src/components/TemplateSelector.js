import React from "react";
import "./TemplateSelector.css";

function TemplateSelector({ templates, selectedId, onSelect, activeTab }) {
  const filtered = templates.filter((tpl) => {
    if (activeTab === "resume") return tpl.type === "resume";
    return tpl.type === "coverLetter";
  });
  return (
    <div className="rc-template-selector">
      <span className="rc-ts-label">
        Template
      </span>
      <div className="rc-ts-list">
        {filtered.map((tpl) => (
          <button
            key={tpl.id}
            className={"rc-ts-tile" + (tpl.id === selectedId ? " rc-ts-selected" : "")}
            onClick={() => onSelect(tpl.id)}
            type="button"
            tabIndex={0}
            aria-label={tpl.name}
          >
            <div className="rc-ts-thumb">
              <img src={tpl.previewImageUrl} alt={tpl.name + " preview"} />
            </div>
            <div className="rc-ts-name">{tpl.name}</div>
          </button>
        ))}
        {!filtered.length && (
          <div style={{ color: "#B39DDB99", padding: "10px" }}>No templates found</div>
        )}
      </div>
    </div>
  );
}

export default TemplateSelector;
