// SCSS
const scssProcess = Deno.run({
  cmd: [
    "sass",
    "--watch",
    "--style",
    "expanded",
    "scss/index.scss:dist/css/client.css",
    "scss/admin.scss:dist/css/admin.css",
    "scss/blocks.scss:dist/css/blocks.css",
  ],
});

// TypeScript/JavaScript
const jsProcess = Deno.run({
  cmd: [
    "deno",
    "bundle",
    "./js/client/client.jsx",
    "./dist/js/client.js",
    "--unstable",
    "--watch",
  ],
});

await jsProcess.status();
await scssProcess.status();
jsProcess.close();
scssProcess.close();
