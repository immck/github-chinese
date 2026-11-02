import { readFile, writeFile } from "node:fs/promises";
const sources = ["adapter-start.js", "upstream-locals.js", "upstream.user.js", "adapter-end.js"];
const parts = [];
for (const source of sources) parts.push(await readFile(new URL(source, import.meta.url), "utf8"));
await writeFile(new URL("content.js", import.meta.url), parts.join("\n;\n"), "utf8");
console.log("Built content.js from local source files.");
