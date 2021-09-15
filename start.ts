import { ensureDirSync } from "https://deno.land/std/fs/mod.ts";

// SCSS
const scssProcess = Deno.run({
  cmd: [
    "sass",
    "--watch",
    "--style",
    "expanded",
    "scss/index.scss:dist/css/client.css",
    "scss/admin.scss:dist/css/admin.css",
    "scss/editor-blocks.scss:dist/css/editor-blocks.css",
  ],
});

// Node bundle cannot create missing directories and therefore would fail without this.
ensureDirSync("./dist/js");

// TypeScript/JavaScript
const jsClientProcess = Deno.run({
  cmd: [
    "deno",
    "bundle",
    "js/client/client.jsx",
    "dist/js/client.js",
    "--unstable",
    "--watch",
  ],
});

const jsEditorProcess = Deno.run({
  cmd: [
    "deno",
    "bundle",
    "js/editor-blocks/editor-blocks.jsx",
    "dist/js/editor-blocks.js",
    "--unstable",
    "--watch",
  ],
});

await jsClientProcess.status();
await jsEditorProcess.status();
await scssProcess.status();
jsClientProcess.close();
jsEditorProcess.close();
scssProcess.close();
