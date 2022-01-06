import React, { useState } from "react";
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

const DocView = (props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const base64toBlob = (file) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    // const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(file);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
};

// `base64String` is the given base 64 data
const blob = base64toBlob(props.file);
const url = URL.createObjectURL(blob);
  return (
    <div className="pdf-container">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.js">
      <div
    style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '450px',
    }}
>
      <Viewer
                fileUrl={"data:application/pdf;base64," + props.file}
                // plugins={[
                //     defaultLayoutPluginInstance,
                // ]}
            />
</div>
      </Worker>
    </div>
  );
};

export default DocView;
