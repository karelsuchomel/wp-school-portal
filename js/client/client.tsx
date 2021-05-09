import { render } from "solid-js/web";

const HelloMessage = props => <div>Hello {props.name}</div>;

render(() => <HelloMessage name="Taylor" />, document.getElementById("root"));