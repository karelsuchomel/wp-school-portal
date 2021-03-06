// SCSS
var scssProcess = Deno.run({
  cmd: [
    "dart",
    "/home/karel/dart-sass/bin/sass.dart",
    "--watch",
    "--style",
    "expanded",
    "scss/index.scss:dist/css/client.css",
    "scss/admin.scss:dist/css/admin.css",
    "scss/blocks.scss:dist/css/blocks.css",
  ],
});
// TypeScript/JavaScript
var jsProcess = Deno.run({
  cmd: [
    "deno",
    "bundle",
    "./js/client/client.tsx",
    "./dist/js/client.js",
    "--unstable",
    "--watch",
  ],
});
await jsProcess.status();
await scssProcess.status();
jsProcess.close();
scssProcess.close();
