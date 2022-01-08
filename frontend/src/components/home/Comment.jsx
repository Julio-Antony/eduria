import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { getToken } from "../../config/Api";

const Comment = (props) => {
  const [author, setAuthor] = useState({});
  const token = getToken();

  console.log(props.comment);

  const data = useCallback(() => {
    const authorsUrl = "/api/users";

    const posts = axios.get(authorsUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([posts])
      .then(
        axios.spread((...allData) => {
          setAuthor(
            allData[0].data.find((user) => user._id === props.comment.user)
          );
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    data();
  }, [data]);
  return (
    <div className="row mb-3" key={props.key}>
      <div className="comment-img-warpper ml-3">
        <img src={"data:image/png;base64," + author.foto} alt="gambar" />
      </div>
      <div className="col-md-10">
        <p className="ml-3 mt-1 comment-author">{author.nama}</p>
        <p className="ml-3">{props.comment.statement}</p>
      </div>
    </div>
  );
};

export default Comment;
