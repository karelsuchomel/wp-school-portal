import { watch } from "https://deno.land/x/drollup@2.42.3+0.17.1/mod.ts";

// Sass
const scssProcess = Deno.run({
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

// Rollup
const options = {
  input: "./js/client/client.tsx",
  output: {
    dir: "./dist/js",
    format: "es" as const,
    sourcemap: true,
  },
  watch: {
    include: ["js/client/**"],
  },
};

const watcher = await watch(options);

// This will make sure that bundles are properly closed after each run
watcher.on("event", (event) => {
  if (event.code === "BUNDLE_END") {
    event.result.close();
  }
});

await scssProcess.status();
scssProcess.close();
watcher.close();
