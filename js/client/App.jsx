import React, { useEffect, useState } from "https://esm.sh/react?dev&no-check";

const fetchLatestPosts = async () => {
    const postData = await fetch(`${SiteSettings.endpoint}?rest_route=/wp/v2/posts`);
    return postData.json();
}

const App = () => {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        fetchLatestPosts()
            .then(data =>
                setPostData(data)
            );
    }, []);
    
    return (
        <div className="root">
            <header>
                <nav id="header-navigation">
                    <div className="navigation-group align-left">
                        { preloadedNavigationDataPrimary.data.map(({title, url}, i) => {
                            return <div key={i} className="nav-item"><a className="nav-link" href={url}>{title}</a></div>
                        }) }
                    </div>
                    <div className="spacer"/>
                    <div className="navigation-group align-right">
                        { preloadedNavigationDataUser.data.map(({title, url}, i) => {
                            return <div key={i} className="nav-item"><a className="nav-link" href={url}>{title}</a></div>
                        }) }
                        <div className="user-menu"/>
                    </div>
                </nav>
            </header>
            <div id="main-content">
                { postData?.map(post => {
                    return <article>{post.title.rendered}<br />{post.content.rendered}</article>
                }) }
            </div>
        </div>
    );
};

export default App;