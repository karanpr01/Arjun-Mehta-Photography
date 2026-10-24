// Many hosts (Netlify, Cloudflare Pages, GitHub Pages, "serve") show a file called 404.html
// for any address that does not exist. The build makes /404/index.html, so we copy it.
// This runs automatically after "npm run build" (npm's "postbuild" hook).

import { copyFile } from "node:fs/promises";

await copyFile("build/client/404/index.html", "build/client/404.html");
console.log("Copied build/client/404/index.html -> build/client/404.html");
