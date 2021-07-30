// Libraries
import React from "https://esm.sh/react?dev&no-check";
import ReactDOM from "https://esm.sh/react-dom?dev&no-check"
import { BrowserRouter as Router, Switch, Route, Link } from "https://esm.sh/react-router-dom?dev&no-check";

// Components
import Dashboard from "./components/dashboard/dashboard.jsx";
import NotFound from "./components/404/not-found.jsx";

// Utilities
import { getRelativePath, siteSettings } from './utils.js';

const App = () => {
    const path = siteSettings.URL.path || "/";
    let blogURL, frontPageRoute;

    if ( siteSettings.frontPage.page ) {
        blogURL = path + 'page/' + siteSettings.frontPage.blog + '/';
        const FrontPageComponent = props => (
            <SinglePage slug={ siteSettings.frontPage.page } { ...props } />
        );
        frontPageRoute = <Route path={ path } component={ FrontPageComponent } />;
    } else {
        blogURL = path;
        frontPageRoute = "/";
    }

    const routes = (
        <Switch>
            <Route path={ blogURL } component={ Dashboard } />
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
            { frontPageRoute }
            <Route path="*" component={ NotFound } />
        </Switch>
    );

    return (
        <Router>
            <header>
                <nav id="header-navigation">
                    <div className="navigation-group align-left">
                        <div className="nav-item"><Link className="nav-link" to={frontPageRoute}>Home</Link></div>
                        { siteSettings.navigationData.primary.map(({title, url}, i) => {
                            return (
                                <div key={i} className="nav-item">
                                    <Link className="nav-link" to={`/${ getRelativePath(url) }`}>{title}</Link>
                                </div>
                            )
                        }) }
                    </div>
                    <div className="spacer"/>
                    <div className="navigation-group align-right">
                        { siteSettings.navigationData.userMenu.map(({title, url}, i) => {
                            return (
                                <div key={i} className="nav-item">
                                    <Link className="nav-link" to={`/${ getRelativePath(url) }`}>{title}</Link>
                                </div>
                            )
                        }) }
                        <div className="user-menu"/>
                        <div className="theme-switcher"/>
                    </div>
                </nav>
            </header>
            { routes }
        </Router>
    );
};

const appRootElement = document.getElementById("root");
ReactDOM.render(<App />, appRootElement);
