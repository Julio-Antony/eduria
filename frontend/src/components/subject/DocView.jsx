import React from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library

const DocView = (props) => {
  return (
    <div className="pdf-container">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.js">
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "450px",
          }}
        >
          <Viewer fileUrl={"data:application/pdf;base64," + props.file} />
        </div>
      </Worker>
    </div>
  );
};

export default DocView;
