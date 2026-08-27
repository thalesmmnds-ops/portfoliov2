"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref";

type Item = {
  key: string;
  width: number;
  height: number;
  // Parallax strength — higher drifts further with the cursor.
  depth: number;
  node: React.ReactNode;
};

const items: Item[] = [
  {
    key: "calgary-tower",
    width: 327,
    height: 447,
    depth: 1.5,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/calgary-tower.jpg" alt="" fill className="object-contain" sizes="327px" />
      </div>
    ),
  },
  {
    key: "figma-logo",
    width: 93,
    height: 141,
    depth: 1,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/figma-logo.webp" alt="" fill className="object-contain" sizes="93px" />
      </div>
    ),
  },
  {
    key: "macbook",
    width: 362,
    height: 304,
    depth: 2,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/macbook.png" alt="" fill className="object-contain" sizes="362px" />
      </div>
    ),
  },
  {
    key: "coffee",
    width: 338,
    height: 338,
    depth: 2.5,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/coffee.png" alt="" fill className="object-contain" sizes="338px" />
      </div>
    ),
  },
  {
    key: "open-to-work",
    width: 259,
    height: 259,
    depth: 1.8,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/open-to-work.png" alt="" fill className="object-contain" sizes="259px" />
      </div>
    ),
  },
  {
    key: "controller",
    width: 316,
    height: 178,
    depth: 2.2,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/controller.png" alt="" fill className="object-contain" sizes="316px" />
      </div>
    ),
  },
  {
    key: "dinosaur",
    width: 498,
    height: 331,
    depth: 1.3,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/dinosaur.png" alt="" fill className="object-contain" sizes="498px" />
      </div>
    ),
  },
  {
    key: "banff-postcard",
    width: 352,
    height: 515,
    depth: 1.6,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/banff-postcard.png" alt="" fill className="object-contain" sizes="352px" />
      </div>
    ),
  },
  {
    key: "florianopolis-postcard",
    width: 394,
    height: 394,
    depth: 2.1,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/florianopolis-postcard.png" alt="" fill className="object-contain" sizes="394px" />
      </div>
    ),
  },
];

const PARALLAX_SENSITIVITY = 1;
const PARALLAX_EASING = 0.06;
const SIDE_MARGIN = 24; // gap from the viewport edge
const TEXT_MARGIN = 48; // gap kept clear around the heading/subtitle column
const ITEM_GAP = 16; // minimum breathing room kept between two items' boxes
const MIN_SCALE = 0.2; // never shrink items past this, even on a very short/crowded screen
const SCALE_STEP = 0.05; // how much to back off per retry when items don't all fit
const GRID_STEP = 8; // resolution of the exhaustive fallback search below

type Rect = { x: number; y: number; width: number; height: number };

function overlaps(a: Rect, b: Rect, gap: number) {
  return (
    a.x < b.x + b.width + gap &&
    a.x + a.width + gap > b.x &&
    a.y < b.y + b.height + gap &&
    a.y + a.height + gap > b.y
  );
}

export default function FallingDecor({
  avoidEl,
}: {
  avoidEl: HTMLDivElement | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const [layout, setLayout] = useState<{ positions: { x: number; y: number }[]; scale: number } | null>(null);

  // Compute a fresh, randomized, non-overlapping layout every time the hero
  // mounts, and again whenever the viewport is resized — item positions are
  // plain pixel values frozen at compute time, so without a recompute here
  // a browser-window resize (or a mobile orientation change) would leave
  // them stale relative to the container's new size: still visually clipped
  // by overflow-hidden while attached to this section, but positioned as if
  // the section were its old height, which reads as images drifting toward
  // — or past — the boundary with whatever section comes next. Items stay
  // clear of the heading/subtitle text as well as each other — letting them
  // run behind the text made it unreadable in testing, so the text keeps
  // its reserved region and items shrink to fit around it instead.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !avoidEl) return;

    const computeLayout = () => {
      const containerRect = container.getBoundingClientRect();
      const avoidRect = avoidEl.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;

      // The text's bounding box (with margin) is the one region items must
      // stay out of. Everything else in the hero — including the open strips
      // above and below the heading — is fair game.
      const avoidBox: Rect = {
        x: avoidRect.left - containerRect.left - TEXT_MARGIN,
        y: avoidRect.top - containerRect.top - TEXT_MARGIN,
        width: avoidRect.width + TEXT_MARGIN * 2,
        height: avoidRect.height + TEXT_MARGIN * 2,
      };

      // Place the largest items first (they're hardest to fit and benefit
      // most from having the full open space to choose from), resampling a
      // spot for each until it clears the text and every item already placed.
      // If nothing clears after many random tries, fall back to an exhaustive
      // grid sweep, which is guaranteed to find a spot if one exists (up to
      // GRID_STEP resolution) rather than settling for a forced overlap.
      const placementOrder = items
        .map((item, index) => index)
        .sort((a, b) => items[b].width * items[b].height - items[a].width * items[a].height);

      const findGridSpot = (w: number, h: number, obstacles: Rect[]) => {
        const maxX = Math.max(width - SIDE_MARGIN - w, SIDE_MARGIN);
        const maxY = Math.max(height - SIDE_MARGIN - h, SIDE_MARGIN);
        for (let y = SIDE_MARGIN; y <= maxY; y += GRID_STEP) {
          for (let x = SIDE_MARGIN; x <= maxX; x += GRID_STEP) {
            const box = { x, y, width: w, height: h };
            if (!obstacles.some((o) => overlaps(box, o, ITEM_GAP))) {
              return { x, y };
            }
          }
        }
        return null;
      };

      // Clamp a candidate into the container's actual bounds. overflow-hidden
      // already clips anything that ends up outside them, but a stale-height
      // candidate landing past the bottom edge is exactly what makes items
      // read as bleeding into whatever section comes after the hero — this
      // is a second, redundant guarantee that it can't happen even if the
      // measured height here were ever wrong.
      const clampToContainer = (pos: { x: number; y: number }, w: number, h: number) => ({
        x: Math.min(Math.max(pos.x, 0), Math.max(width - w, 0)),
        y: Math.min(Math.max(pos.y, 0), Math.max(height - h, 0)),
      });

      // Try to place every item at the given scale. Returns the positions and
      // whether every single item found a genuinely clear spot.
      const attemptLayout = (scale: number) => {
        const placed: Rect[] = [];
        const positionByIndex = new Array<{ x: number; y: number }>(items.length);
        let allClear = true;
        for (const index of placementOrder) {
          const item = items[index];
          const w = item.width * scale;
          const h = item.height * scale;
          const candidateTopLeft = () => ({
            x: SIDE_MARGIN + Math.random() * Math.max(width - SIDE_MARGIN * 2 - w, 0),
            y: SIDE_MARGIN + Math.random() * Math.max(height - SIDE_MARGIN * 2 - h, 0),
          });

          let best = candidateTopLeft();
          let clear = false;
          for (let attempt = 0; attempt < 600; attempt++) {
            const candidate = candidateTopLeft();
            const box = { x: candidate.x, y: candidate.y, width: w, height: h };
            if (![avoidBox, ...placed].some((o) => overlaps(box, o, ITEM_GAP))) {
              best = candidate;
              clear = true;
              break;
            }
          }
          if (!clear) {
            const gridSpot = findGridSpot(w, h, [avoidBox, ...placed]);
            if (gridSpot) {
              best = gridSpot;
              clear = true;
            }
          }
          if (!clear) allClear = false;
          best = clampToContainer(best, w, h);
          placed.push({ x: best.x, y: best.y, width: w, height: h });
          positionByIndex[index] = best;
        }
        return { positions: positionByIndex, allClear };
      };

      // Items render at full size whenever they fit. Only once they genuinely
      // don't (a short/narrow viewport, or simply a lot of items) do we back
      // off scale in small steps and re-run the whole placement, so the
      // shrink is always the minimum needed rather than a hand-tuned guess
      // that has to be re-tuned every time an image gets added. A few retries
      // per scale level absorb the randomness of any one attempt — the greedy
      // placement order means an early item's random spot can occasionally
      // box in a later one even when a clear layout exists at that scale.
      let scale = 1;
      let result = attemptLayout(scale);
      for (let tries = 1; !result.allClear && tries < 5; tries++) {
        result = attemptLayout(scale);
      }
      while (!result.allClear && scale > MIN_SCALE) {
        scale = Math.max(MIN_SCALE, scale - SCALE_STEP);
        result = attemptLayout(scale);
        for (let tries = 1; !result.allClear && tries < 5; tries++) {
          result = attemptLayout(scale);
        }
      }

      setLayout({ positions: result.positions, scale });
    };

    computeLayout();

    // Recompute on resize (debounced — this only needs to settle once the
    // user stops dragging/rotating, not on every intermediate frame).
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(computeLayout, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [avoidEl]);

  // Subtle eased mouse-parallax layered on top of each item's fixed spot.
  useLayoutEffect(() => {
    if (!layout) return;
    const parallax = items.map(() => ({ x: 0, y: 0 }));

    let frame: number;
    const sync = () => {
      const mouseX = mousePositionRef.current.x;
      const mouseY = mousePositionRef.current.y;

      items.forEach((item, i) => {
        const el = elRefs.current[i];
        if (!el) return;

        const strength = (item.depth * PARALLAX_SENSITIVITY) / 20;
        const targetX = mouseX * strength;
        const targetY = mouseY * strength;
        const p = parallax[i];
        p.x += (targetX - p.x) * PARALLAX_EASING;
        p.y += (targetY - p.y) * PARALLAX_EASING;

        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      });
      frame = requestAnimationFrame(sync);
    };
    sync();

    return () => cancelAnimationFrame(frame);
  }, [layout, mousePositionRef]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-y-0 left-1/2 z-0 block w-screen -translate-x-1/2 overflow-hidden"
    >
      {layout &&
        items.map((item, i) => (
          <div
            key={item.key}
            ref={(el) => {
              elRefs.current[i] = el;
            }}
            className="absolute"
            style={{
              left: layout.positions[i].x,
              top: layout.positions[i].y,
              width: item.width * layout.scale,
              height: item.height * layout.scale,
              willChange: "transform",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -(8 + (i % 3) * 3), 0] }}
              transition={{
                opacity: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
                y: {
                  duration: 3 + (i % 4) * 0.6,
                  delay: i * 0.15 + 0.6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              }}
              className="h-full w-full"
            >
              {item.node}
            </motion.div>
          </div>
        ))}
    </div>
  );
}
