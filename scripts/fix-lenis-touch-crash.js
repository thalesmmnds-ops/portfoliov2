#!/usr/bin/env node
// Idempotent, cache-safe fix for a real bug in Lenis: its onTouchStart /
// onTouchMove handlers destructure event.targetTouches[0] without checking
// the touch list isn't empty — which it legitimately can be mid-gesture.
// Left unfixed, an empty-touches tick either throws (older code) or, worse,
// writes `undefined` into Lenis's internal touchStart.x/y, which poisons the
// next real touchmove's delta to NaN and permanently freezes scroll (see the
// "Fix the real cause of scroll permanently freezing" commit for the full
// trace).
//
// We previously shipped this as a patch-package diff. That broke production:
// Vercel restored a build cache with node_modules/lenis already patched by
// an *older* version of the fix, so the diff's expected "before" text no
// longer matched the cached file and patch-package failed the whole build.
// This script sidesteps that failure mode entirely — it's a search-and-fix
// that no-ops safely no matter which of the three possible prior states
// (clean/original, our first patch, or already-fixed) the cached
// node_modules happens to be in, instead of requiring an exact match.
const fs = require("fs");
const path = require("path");

const GUARD = "if (event.targetTouches && event.targetTouches.length === 0) return;";
const ORIGINAL =
  "const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;";
const OLD_PATCH =
  "const { clientX, clientY } = event.targetTouches && event.targetTouches.length > 0 ? event.targetTouches[0] : event;";

const files = ["node_modules/lenis/dist/lenis.mjs", "node_modules/lenis/dist/lenis.js"];

for (const rel of files) {
  const file = path.join(__dirname, "..", rel);
  if (!fs.existsSync(file)) continue;
  let src = fs.readFileSync(file, "utf8");

  if (src.includes(GUARD)) {
    console.log(`[fix-lenis-touch-crash] ${rel} already patched`);
    continue;
  }

  let changed = false;
  for (const variant of [ORIGINAL, OLD_PATCH]) {
    if (!src.includes(variant)) continue;
    const idx = src.indexOf(variant);
    const lineStart = src.lastIndexOf("\n", idx) + 1;
    const indent = src.slice(lineStart, idx);
    const replacement = `${GUARD}\n${indent}${variant}`;
    src = src.split(variant).join(replacement);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, src);
    console.log(`[fix-lenis-touch-crash] patched ${rel}`);
  } else {
    console.log(
      `[fix-lenis-touch-crash] WARNING: expected code not found in ${rel} (lenis internals may have changed) — skipping, not blocking the build`
    );
  }
}
