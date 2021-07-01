import { React } from "../inc/react.ts";

const App = () => {
    return (
        <div className="root">
            <header>
                <nav id="header-navigation">
                    <div className="nav-item"><a className="nav-link">Home</a></div>
                    <div className="nav-item"><a className="nav-link">Curriculum</a></div>
                    <div className="spacer"/>
                    <div className="nav-item"><a className="nav-link">Lunch</a></div>
                    <div className="nav-item"><a className="nav-link">Courses</a></div>
                    <div className="nav-item"><a className="nav-link">Events</a></div>
                    <div className="nav-item"><a className="nav-link">User</a></div>
                </nav>
            </header>
            <div className="main-content">
                <pre>Loading ...</pre>
                <p>Open up App.tsx to start working on your app, do it!</p>
            </div>
        </div>
    );
};

export default App;