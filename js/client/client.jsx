// Libraries
import React from "https://esm.sh/react?dev&no-check";
import ReactDOM from "https://esm.sh/react-dom?dev&no-check";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "https://esm.sh/react-router-dom?dev&no-check";

// Components
import Dashboard from "./components/dashboard/dashboard.jsx";
import NotFound from "./components/404/not-found.jsx";
import Link from "./components/bits/Link.jsx";
import Post from "./components/post/post.jsx";
import Page from "./components/post/page.jsx";

// Utilities
import { siteSettings } from "./utils/utils.ts";

const App = () => {
  let frontPageRoute;

  // WordPress has settings "Your homepage displays => A static page"
  // This is preferred settings, so users can edit dashboard's components
  try {
    if (siteSettings.frontPage.page) {
      const FrontPageComponent = (props) =>
        <Dashboard slug={siteSettings.frontPage.page} {...props} />;
      frontPageRoute = <Route path={"/"} component={FrontPageComponent} exact/>;
    } else {
      throw "Wordpress does not have a homepage set, to a static page. Try to change this in the Settings => Reading => Your homepage displays => A static page (and choose static page).";
    }
  } catch (e) {
    console.log(e);
  }

  const routes = (
    <Switch>
      <Route path={ `/:year/:month/:slug` } component={ Post } />
      <Route path={ `/page/:slug` } component={ Page } />
      {frontPageRoute}
      <Route path="*" component={NotFound} />
    </Switch>
  );

  return (
    <Router>
      <header>
        <nav id="header-navigation">
          <div className="navigation-group align-left">
            {siteSettings.navigationData.primary.map(({ title, url }, i) => {
              return (
                <div key={i} className="nav-item">
                  <Link
                    title={title}
                    to={url}
                  />
                </div>
              );
            })}
          </div>
          <div className="spacer" />
          <div className="navigation-group align-right">
            {siteSettings.navigationData.userMenu.map(({ title, url }, i) => {
              return (
                <div key={i} className="nav-item">
                  <Link
                    title={title}
                    to={url}
                  />
                </div>
              );
            })}
            <div className="user-menu" />
            <div className="theme-switcher" />
          </div>
        </nav>
      </header>
      {routes}
    </Router>
  );
};

const appRootElement = document.getElementById("root");
ReactDOM.render(<App />, appRootElement);
