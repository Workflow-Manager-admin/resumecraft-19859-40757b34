import React from "react";

function DocumentPreview({ html }) {
  return (
    <div
      className="rc-doc-preview"
      style={{ minHeight: 280, background: "none" }}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

export default DocumentPreview;
