export { default as React } from "https://esm.sh/react?dev&no-check";
export { default as ReactDOM } from "https://esm.sh/react-dom?dev&no-check";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}
