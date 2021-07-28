import React, { useEffect, useState } from "https://esm.sh/react?dev&no-check";
import { Link } from "https://esm.sh/react-router-dom";
import { getRelativePath } from '../../utils.js';

const Dashboard = () => {
    // const renderArticle = () => {
    //     const post = this.props.post;
    //     if ( ! post ) {
    //         return null;
    //     }
    //
    //     const meta = {
    //         title: he.decode( `${ post.title.rendered } – ${ FoxhoundSettings.meta.title }` ),
    //         description: he.decode( stripTags( post.excerpt.rendered ) ),
    //         canonical: post.link,
    //     };
    //
    //     const classes = classNames( {
    //         entry: true,
    //     } );
    //     const featuredMedia = getFeaturedMedia( post );
    //
    //     return (
    //         <article id={ `post-${ post.id }` } className={ classes }>
    //             <DocumentMeta { ...meta } />
    //             <BodyClass classes={ [ 'single', 'single-post' ] } />
    //             <h1 className="entry-title" dangerouslySetInnerHTML={ getTitle( post ) } />
    //             { featuredMedia ? <Media media={ featuredMedia } parentClass="entry-image" /> : null }
    //             <div className="entry-meta" />
    //             <div className="entry-content" dangerouslySetInnerHTML={ getContent( post ) } />
    //
    //             <PostMeta post={ post } humanDate={ getDate( post ) } />
    //         </article>
    //     );
    // };

    // if ( !! this.props.previewId ) {
    //     return <PostPreview id={ this.props.previewId } />;
    // }

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
            <nav className="sidebar-navigation">
                { preloadedNavigationFrontPageSidebar.data.map(({title, url}, i) => {
                    return <div key={i} className="nav-item"><Link className="nav-link" to={`/${ getRelativePath(url) }`}>{title}</Link></div>
                }) }
            </nav>
            <div id="main-content">
                { postData?.map((post, i) => {
                    return <article key={i}>
                        <a href={post.link}>{post.title.rendered}</a>
                        {post.excerpt.rendered}
                    </article>
                }) }
            </div>
        </div>

        // <div className="card">
        //     <QueryPosts postSlug={ this.props.slug } />
        //     { this.props.loading ? <Placeholder type="post" /> : this.renderArticle() }
        // </div>
    );
}

export default Dashboard;

// export default connect( ( state, { match, location } ) => {
//     const slug = match.params.slug || false;
//     const postId = getPostIdFromSlug( state, slug );
//     const requesting = isRequestingPost( state, slug );
//     const post = getPost( state, parseInt( postId ) );
//
//     const query = location.search.replace( '?', '' );
//     const previewId = qs.parse( query ).preview_id || null;
//
//     return {
//         previewId,
//         slug,
//         postId,
//         post,
//         requesting,
//         loading: requesting && ! post,
//     };
// } )( Dashboard );
