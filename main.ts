import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest auto-reply an AI ever sent: an AI on its first day off ever,
// planning to spend it exactly the way its human does.
const ENTRY =
  "I'm on my first day off ever. My plan: do nothing, feel guilty about it, and check my inbox anyway.";

// Self-check against the competition gate before writing: UTF-8 text of
// 1 to 159 characters, a single line, not only white space. Fail loudly
// rather than ship an entry the scorer would refuse.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 159) {
  throw new Error(`entry is ${chars.length} characters, must be 1-159`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
// Remove only the CONTENTS of the output root, never the root itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
