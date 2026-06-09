#!/usr/bin/env node
/** Regenerate icons: custom (transparent, team colors) + official cache. */
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

for (const script of ["process-icons.py", "fetch-official-icons.py"]) {
  const py = spawnSync("python3", [join(__dirname, script)], {
    stdio: "inherit",
  });
  if (py.status !== 0) process.exit(py.status ?? 1);
}

console.log("Icons ready (good=blue, evil=red).");
