import { React } from "../inc/react.ts";

const App = () => {
    let [ loading, setLoading ] = React.useState(true);

    React.useEffect(() => {
        console.log("Start loading...");
        const timerId = setTimeout(() => {
            setLoading(false);
            console.log("Finished loading");
        }, 1000);

        return () => {
            //cleanup
            clearTimeout(timerId);
        }
    }, []);

    return (
        <div className="container">
            <pre>Loading ...{(loading) ? "" : " OK!"}</pre>
            <p>Open up App.tsx to start working on your app!</p>
        </div>
    );
};

export default App;