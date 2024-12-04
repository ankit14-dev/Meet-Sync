// src/HomePage.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FileUpload from "./fileUploader/FileUpload";
import Output from "./Output";

export default function HomePage() {
  const [summary, setSummary] = useState("");
  const [transcription, setTranscription] = useState("");

  const handleGenerateOutput = (response) => {
    setSummary(response.summary);
    setTranscription(response.transcribe);
  };

  return (
    <>
      <Navbar />
      <section className="container mt-5">
        <h1 className="py-3 pt-5">Welcome to MeetSynC</h1>
        <div className="row mt-4">
          <div className="col-md-6">
            {/* <FileUpload
              onGenerateOutput={handleGenerateOutput}
              onReset={handleResetOutput}
            /> */}
            <div className="output-area">
              <FileUpload callback={handleGenerateOutput} />
            </div>
          </div>
          <div className="col-md-6">
            <Output summary={summary} transcription={transcription} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
