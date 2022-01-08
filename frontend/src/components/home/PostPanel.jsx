import React from "react";

const PostPanel = (props) => {
  return (
    <>
      {props.pengumuman ? (
        _renderCard(props.pengumuman, props.display)
      ) : (
        <div className="col">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

const _renderCard = (pengumuman, display) => {
  if (pengumuman && pengumuman.length > 0) {
    return <>{display}</>;
  } else {
    return <div className="col"></div>;
  }
};

export default PostPanel;
