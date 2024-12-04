// src/HomePage.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FileUpload from "./fileUploader/FileUpload";
import Output from "./Output";

export default function HomePage() {
  const [outputText, setOutputText] = useState("");

  const handleGenerateOutput = (data) => {
    setOutputText(`
      <p><strong>URL:</strong> ${data.url || "N/A"}</p>
      <p><strong>File Name:</strong> ${data.fileName}</p>
      <p>${data}</p>
    `);
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
            <FileUpload callback={handleGenerateOutput}/>
          </div>
          <div className="col-md-6">
            <Output outputText={outputText} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
