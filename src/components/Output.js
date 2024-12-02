// src/components/Output.js
import React from "react";

export default function Output({ outputText }) {
  const handleDownload = () => {
    const blob = new Blob([outputText], { type: "text/plain" });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "output.txt";
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText.replace(/<\/?[^>]+(>|$)/g, "")).then(() => {
      alert("Output copied to clipboard!");
    });
  };

  return (
    <div className="output-area">
      <div className="output-buttons">
        <button className="btn btn-success mx-2" onClick={handleDownload}>
          <i className="fa-solid fa-download"></i>
        </button>
        <button className="btn btn-secondary" onClick={handleCopy}>
          <i className="fa-regular fa-copy"></i>
        </button>
      </div>
      <h4>Output</h4>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: outputText }} />
    </div>
  );
}
