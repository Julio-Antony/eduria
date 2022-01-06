import React from "react";
import DocViewer from "react-doc-viewer";

const DocView = (props) => {
  const docs = [{ uri: props.file }];
  return <DocViewer documents={docs} />;
};

export default DocView;
