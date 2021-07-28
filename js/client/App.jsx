import React from "https://esm.sh/react?dev&no-check";
import { BrowserRouter as Router, Switch, Route, Link } from "https://esm.sh/react-router-dom";
import Dashboard from "./components/dashboard/dashboard.jsx";
import Page from "./components/post/page.jsx";
import NotFound from "./components/404/not-found.jsx";
import { getRelativePath } from './utils.js';

const path = SiteSettings.URL.path || '/';

const App = () => {
    let blogURL, frontPageRoute;
    if ( SiteSettings.frontPage.page ) {
        blogURL = path + 'page/' + SiteSettings.frontPage.blog + '/';
        const FrontPageComponent = props => (
            <SinglePage slug={ SiteSettings.frontPage.page } { ...props } />
        );
        frontPageRoute = <Route path={ path } component={ FrontPageComponent } />; // eslint-disable-line react/jsx-no-bind
    } else {
        blogURL = path;
        frontPageRoute = "/";
    }

    const routes = (
        <Switch>
            <Route path={ blogURL } exact component={ Dashboard } />
            <Route path={ `${ blogURL }p/:paged` } component={ Dashboard } />
            <Route path={ `${ path }:year/:month/:slug` } component={ Page } />
            {/*<Route path={ `${ path }search/:search` } component={ Search } />*/}
            {/*<Route path={ `${ path }attachment/:id` } component={ Attachment } />*/}
            {/*<Route path={ `${ path }category/:slug` } component={ getTermComponent( 'category' ) } />*/}
            {/*<Route*/}
            {/*    path={ `${ path }category/:slug/p/:paged` }*/}
            {/*    component={ getTermComponent( 'category' ) }*/}
            {/*/>*/}
            {/*<Route path={ `${ path }tag/:slug` } component={ getTermComponent( 'post_tag' ) } />*/}
            {/*<Route*/}
            {/*    path={ `${ path }tag/:slug/p/:paged` }*/}
            {/*    component={ getTermComponent( 'post_tag' ) }*/}
            {/*/>*/}
            {/*<Route path={ `${ path }date/:year` } component={ DateArchive } />*/}
            {/*<Route path={ `${ path }date/:year/p/:paged` } component={ DateArchive } />*/}
            {/*<Route path={ `${ path }date/:year/:month` } component={ DateArchive } />*/}
            {/*<Route path={ `${ path }date/:year/:month/p/:paged` } component={ DateArchive } />*/}
            {/*<Route path={ `${ path }date/:year/:month/:day` } component={ DateArchive } />*/}
            {/*<Route path={ `${ path }date/:year/:month/:day/p/:paged` } component={ DateArchive } />*/}
            {/*<Route path={ `${ path }author/:slug` } component={ Author } />*/}
            {/*<Route path={ `${ path }author/:slug/p/:paged` } component={ Author } />*/}
            <Route path={ `${ path }page/:slugOrId` } component={ Page } />
            { frontPageRoute }
            <Route path="*" component={ NotFound } />
        </Switch>
    );

    //const makeValid
    
    return (
        <div className="root">
            <Router basename="">
                <header>
                    <nav id="header-navigation">
                        <div className="navigation-group align-left">
                            <div className="nav-item"><Link className="nav-link" to={frontPageRoute}>Home</Link></div>
                            { preloadedNavigationDataPrimary.data.map(({title, url}, i) => {
                                return <div key={i} className="nav-item"><Link className="nav-link" to={`/${ getRelativePath(url) }`}>{title}</Link></div>
                            }) }
                        </div>
                        <div className="spacer"/>
                        <div className="navigation-group align-right">
                            { preloadedNavigationDataUser.data.map(({title, url}, i) => {
                                return <div key={i} className="nav-item"><Link className="nav-link" to={`/${ getRelativePath(url) }`}>{title}</Link></div>
                            }) }
                            <div className="user-menu"/>
                            <div className="theme-switcher"/>
                        </div>
                    </nav>
                </header>
                { routes }
            </Router>
        </div>
    );
};

export default App;