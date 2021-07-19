import React, { useEffect, useState } from "https://esm.sh/react?dev&no-check";
import QueryPage from "https://esm.sh/wordpress-query-page?dev&no-check";

const Page = () => {
    const fetchLatestPosts = async () => {
        const postData = await fetch(`${SiteSettings.endpoint}?rest_route=/wp/v2/posts`);
        return postData.json();
    }

    const [postData, setPostData] = useState([]);

    useEffect(() => {
        fetchLatestPosts()
            .then(data =>
                setPostData(data)
            );
    }, []);

    return (
        <div>
            {/*<QueryPage pagePath={''} />*/}
            <h1>Post page</h1>
        </div>
    );
}

export default Page;