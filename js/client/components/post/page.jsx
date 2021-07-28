import React, { useEffect, useState } from "https://esm.sh/react?dev&no-check";
import { useParams } from "https://esm.sh/react-router-dom?dev&no-check";
import isEmpty from "https://esm.sh/lodash.isempty?dev&no-check";

const Page = () => {
    let { slugOrId } = useParams();

    const fetchLatestPosts = async () => {
        const postData = await fetch(`${SiteSettings.endpoint}?rest_route=/wp/v2/pages&pagename=${slugOrId}&_embed=true`);
        return postData.json();
    }

    const [postData, setPostData] = useState({});

    useEffect(() => {
        fetchLatestPosts()
            .then(data =>
                setPostData(data)
            );
    }, []);

    let postContent;
    if(!isEmpty(postData)) {
        postContent = (
            <div className="post-wrapper">
                <h1>{postData.title.rendered}</h1>
                <div className="post-content" dangerouslySetInnerHTML={{__html: postData.content.rendered}}/>
            </div>
        )
    }

    return (
        <div>
            {postContent}
        </div>
    );
}

export default Page;