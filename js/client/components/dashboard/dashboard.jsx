import React, { useEffect, useState } from "https://esm.sh/react?dev&no-check";
import { Switch, Route, Link, useRouteMatch } from "https://esm.sh/react-router-dom?dev&no-check";
import { getRelativePath, siteSettings } from '../../utils.js';

import Post from "../post/post.jsx";
import Page from "../post/page.jsx";

const Dashboard = () => {
    let { path } = useRouteMatch();

    return (
        <div className="dashboard-wrapper">
            <nav className="sidebar-navigation">
                { siteSettings.navigationData.dashboard.map(({title, url}, i) => {
                    return <div key={i} className="nav-item"><Link className="nav-link" to={`/${ getRelativePath(url) }`}>{title}</Link></div>
                }) }
            </nav>
            <div className="dashboard-content">
                <Switch>
                    <Route exact path={path}>
                        <Posts />
                    </Route>
                    <Route path={ `${ path }:year/:month/:slug` }>
                        <Post />
                    </Route>
                    <Route path={ `${ path }page/:slug` }>
                        <Page />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

const Posts = () => {
    const [postsData, setPostsData] = useState([]);

    useEffect(() => {
        let isValid = true;

        const fetchLatestPosts = async () => {
            // TODO : Handle cases where invalid slug won't return any data
            const postData = await fetch(`${siteSettings.endpoint}?rest_route=/wp/v2/posts`);
            const data = await postData.json();
            if(isValid) {
                setPostsData(data);
            }
        }

        fetchLatestPosts();
        return () => {
            isValid = false;
        }
    }, []);

    return (
        <div className="posts-wrapper">
            { postsData.map((post, i) => (
                <article key={i}>
                    <Link to={`/${ getRelativePath(post.link) }`}>{post.title.rendered}</Link>
                    {post.excerpt.rendered}
                </article>
            ) )}
        </div>
    );
}

export default Dashboard;
