import React, { useEffect, useState } from "https://esm.sh/react?dev&no-check";
import isEmpty from "https://esm.sh/lodash.isempty?dev&no-check";
import { siteSettings } from '../../utils.js';

const Page = (props) => {
    const [postData, setPostData] = useState({});

    useEffect(() =>
    {
        let validRequest = true;

        const fetchLatestPosts = async () => {
            const postData = await fetch(`${siteSettings.endpoint}?rest_route=/wp/v2/pages&slug=${props.match.params.slugOrId}&_embed=true`);
            const data = await postData.json();
            if(validRequest) {
                setPostData(data[0]);
            }
        }

        fetchLatestPosts()
        return () => {
            validRequest = false;
        }
    }, [props.match.params.slugOrId]);

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