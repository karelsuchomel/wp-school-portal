import { React } from "../inc/react.js";

// const fetchLatestPosts = () => {
//     fetch()
// }

const App = () => {
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
                <p>Open up App.tsx to start working on your app, do it!</p>
            </div>
        </div>
    );
};

export default App;