// src/components/Output.js
import React, { useState } from "react";

export default function Output({ summary, transcription }) {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="output-area">
      <h3>Output</h3>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "summary" ? "active" : ""}`}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "transcription" ? "active" : ""}`}
            onClick={() => setActiveTab("transcription")}
          >
            Transcription
          </button>
        </li>
      </ul>
      <div className="tab-content mt-3">
        {activeTab === "summary" && <p>{summary || "No summary available."}</p>}
        {activeTab === "transcription" && (
          <p>{transcription || "No transcription available."}</p>
        )}
      </div>
    </div>
  );
}
