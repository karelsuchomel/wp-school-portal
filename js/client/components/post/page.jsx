import React, { useEffect, useState } from "https://esm.sh/react?dev&no-check";
import { useParams } from "https://esm.sh/react-router-dom?dev&no-check";
import Single from "./single.jsx";
import { siteSettings } from '../../utils.js';

const Page = () => {
    const [pageData, setPageData] = useState({});
    let { slug } = useParams();

    useEffect(() =>
    {
        let validRequest = true;

        const fetchPageContent = async () => {
            const pageData = await fetch(`${siteSettings.endpoint}?rest_route=/wp/v2/pages&slug=${slug}&_embed=true`);
            const data = await pageData.json();
            if(validRequest) {
                setPageData(data[0]);
            }
        }

        fetchPageContent()
        return () => {
            validRequest = false;
        }
    }, [slug]);

    return (
        <Single postData={pageData}/>
    );
}

export default Page;