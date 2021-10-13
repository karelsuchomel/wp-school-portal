import React from "https://esm.sh/react?dev&no-check";

const Single = (props) => {
  const { postData } = props;

  let postContent;
  if (postData) {
    postContent = (
      <div className="post-wrapper">
        <h1>{postData.title.rendered}</h1>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: postData.content.rendered }}
        />
      </div>
    );
  }

  return (
    <div>
      {postContent ? postContent : "Loading..."}
    </div>
  );
};

export default Single;
