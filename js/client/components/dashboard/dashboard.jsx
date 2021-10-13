import React, { useEffect, useState } from "https://esm.sh/react?dev&no-check";
import { siteSettings } from "../../utils/utils.ts";
import Link from "../bits/Link.jsx";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <nav className="sidebar-navigation">
        {siteSettings.navigationData.dashboard.map(({ title, url }, i) => {
          return (
            <div key={i} className="nav-item">
              <Link
                title={title}
                to={url}
              />
            </div>
          );
        })}
      </nav>
      <div className="dashboard-content">
        <Posts />
      </div>
    </div>
  );
};

const Posts = () => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    let isValid = true;

    const fetchLatestPosts = async () => {
      // TODO : Handle cases where invalid slug won't return any data
      const postData = await fetch(
        `${siteSettings.endpoint}?rest_route=/wp/v2/posts`,
      );
      const data = await postData.json();
      if (isValid) {
        setPostsData(data);
      }
    };

    fetchLatestPosts();
    return () => {
      isValid = false;
    };
  }, []);

  return (
    <div className="post-list">
      {postsData.map((post, i) => (
        <article key={i}>
          <h3>
            <Link to={post.link} title={post.title.rendered} />
          </h3>
          <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </article>
      ))}
    </div>
  );
};

export default Dashboard;
