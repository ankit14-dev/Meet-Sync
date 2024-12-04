import React, { useRef, useState } from "react";
import "./FileUpload.css";
import axios from "axios";

function FileUpload({ callback }) {
  const inputRef = useRef();
  //State variable for tracking file related information
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("Select"); //"select"||uploading || "done"

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      handleUpload();
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleReset = () => {
    clearFileInput();
    callback(null);
  }
  const handleUpload = async () => {
    //if upload is already done clear and return
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }
    try {
      //set upload status to uploading
      setUploadStatus("uploading");
      //create form Data and append selected file
      const formData = new FormData();
      formData.append("file", selectedFile);
      //make a asynchronous POST Request to the serverfor file upload
      const response = await axios.post(
        "http://13.201.188.161:5000/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            //update progress base on upload progress
            const percentageCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentageCompleted);
          },
        }
      );
      setUploadStatus("done");
      callback(response.data);
    } catch (error) {
      setUploadStatus("select");
    }
  };
  const truncateFileName = (fileName, maxLength = 20) => {
    if (fileName.length <= maxLength) return fileName;

    const extension = fileName.split(".").pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf("."));
    const truncatedName = nameWithoutExt.substring(0, maxLength - 3) + "...";

    return `${truncatedName}.${extension}`;
  };
  return (
    <>
      <div>
        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {!selectedFile && (
          <button className="file-btn" onClick={onChooseFile}>
            <span className="material-symbols-outlined">upload</span>Upload File
          </button>
        )}

        {selectedFile && (
          <div className="upload-container-box">
            <div className="file-card">
              <span className="material-symbols-outlined">description</span>
              <div className="file-info">
                <div style={{ flex: 1 }}>
                  {/* {display file name and progress bar} */}
                  <h6>{truncateFileName(selectedFile.name)}</h6>
                  <div className="progress-bg">
                    <div
                      className="progress"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                {/* {Display clear button or upload progress/check mark} */}

                {uploadStatus === "select" ? (
                  <button onClick={clearFileInput}>
                    <span className="material-symbols-outlined close-icon">
                      cancel
                    </span>
                  </button>
                ) : (
                  <div className="check-circle">
                    {uploadStatus === "uploading" ? (
                      `${progress}%`
                    ) : uploadStatus === "done" ? (
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "20px" }}
                      >
                        check_circle
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            {/* button to fianilise upload or clear selection */}
          </div>
        )}
        {uploadStatus === "done" && (
          <>
            <button className="upload-btn" onClick={handleReset}>
            </button>
            <div>Your File is Uploaded</div>
            <button className="generate-btn">Generate Summary</button>
          </>
        )}
      </div>
    </>
  );
}

export default FileUpload;
