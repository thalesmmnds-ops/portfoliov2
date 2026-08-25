"use client";

import { RefObject, useEffect, useRef } from "react";
import Image from "next/image";
import Matter from "matter-js";
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref";

type Item = {
  key: string;
  width: number;
  height: number;
  // Parallax strength once settled — higher drifts further with the cursor.
  depth: number;
  node: React.ReactNode;
};

const items: Item[] = [
  {
    key: "calgary-tower",
    width: 143,
    height: 196,
    depth: 1.5,
    node: (
      <div className="relative h-full w-full drop-shadow-lg">
        <Image src="/hero/calgary-tower.jpg" alt="" fill className="object-contain" sizes="143px" />
      </div>
    ),
  },
  {
    key: "figma-logo",
    width: 41,
    height: 62,
    depth: 1,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/figma-logo.webp" alt="" fill className="object-contain" sizes="41px" />
      </div>
    ),
  },
  {
    key: "macbook",
    width: 159,
    height: 133,
    depth: 2,
    node: (
      <div className="relative h-full w-full drop-shadow-lg">
        <Image src="/hero/macbook.png" alt="" fill className="object-contain" sizes="159px" />
      </div>
    ),
  },
  {
    key: "coffee",
    width: 191,
    height: 127,
    depth: 2.5,
    node: (
      <div className="relative h-full w-full drop-shadow-lg">
        <Image src="/hero/coffee.jpg" alt="" fill className="object-contain" sizes="191px" />
      </div>
    ),
  },
];

const PARALLAX_SENSITIVITY = 1;
const PARALLAX_EASING = 0.06;
const SIDE_MARGIN = 24; // gap from the viewport edge
const TEXT_MARGIN = 32; // gap kept clear around the heading/subtitle column
const ITEM_GAP = 28; // minimum breathing room kept between two items' boxes

export default function FallingDecor({
  avoidRef,
}: {
  avoidRef: RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);

  useEffect(() => {
    const container = containerRef.current;
    const avoidEl = avoidRef.current;
    if (!container || !avoidEl) return;

    const { Engine, Runner, Bodies, Composite } = Matter;
    const containerRect = container.getBoundingClientRect();
    const avoidRect = avoidEl.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    // The text's bounding box (with margin) is the one region items must
    // stay out of. Everything else in the hero — including the open strips
    // above and below the heading — is fair game, which matters at typical
    // desktop widths where the text column is wide enough to leave only a
    // narrow left/right sliver (too narrow for these images to fit side by
    // side without overlapping each other).
    const avoidBox = {
      x: avoidRect.left - containerRect.left - TEXT_MARGIN,
      y: avoidRect.top - containerRect.top - TEXT_MARGIN,
      width: avoidRect.width + TEXT_MARGIN * 2,
      height: avoidRect.height + TEXT_MARGIN * 2,
    };

    const overlaps = (
      a: { x: number; y: number; width: number; height: number },
      b: { x: number; y: number; width: number; height: number },
      gap: number,
    ) =>
      a.x < b.x + b.width + gap &&
      a.x + a.width + gap > b.x &&
      a.y < b.y + b.height + gap &&
      a.y + a.height + gap > b.y;

    const candidateTopLeft = (item: Item) => ({
      x: SIDE_MARGIN + Math.random() * Math.max(width - SIDE_MARGIN * 2 - item.width, 0),
      y: SIDE_MARGIN + Math.random() * Math.max(height - SIDE_MARGIN * 2 - item.height, 0),
    });

    // Place items one at a time, resampling a spot until it clears the text
    // and every item already placed (up to a cap so this always
    // terminates), so they spread out instead of landing on top of the text
    // or each other. If nothing clears after many tries (a very cramped
    // viewport), fall back to whichever candidate overlapped the least.
    const placed: { x: number; y: number; width: number; height: number }[] = [];
    const restPositions = items.map((item) => {
      let best = candidateTopLeft(item);
      let bestScore = Infinity;
      for (let attempt = 0; attempt < 150; attempt++) {
        const candidate = candidateTopLeft(item);
        const box = { x: candidate.x, y: candidate.y, width: item.width, height: item.height };
        const clashes = [avoidBox, ...placed].filter((p) => overlaps(box, p, ITEM_GAP)).length;
        if (clashes === 0) {
          best = candidate;
          bestScore = 0;
          break;
        }
        if (clashes < bestScore) {
          bestScore = clashes;
          best = candidate;
        }
      }
      placed.push({ x: best.x, y: best.y, width: item.width, height: item.height });
      return { x: best.x + item.width / 2, y: best.y + item.height / 2 };
    });

    const engine = Engine.create({ positionIterations: 12, velocityIterations: 10 });
    engine.gravity.y = 1;

    // Collision categories: each item can only land on its OWN platform (plus
    // the shared safety net/walls), not whichever platform it happens to pass
    // over first while falling.
    const DEFAULT_CATEGORY = 0x0001;
    const platformCategory = (i: number) => 0x0002 << i;

    // Every item gets its own landing platform at its randomized resting
    // spot, so items stick where they land instead of piling on one shared
    // floor. Generously sized so a tumbling item can't tunnel past it. A
    // catch-all floor near the bottom is a safety net only.
    const platforms = items.map((item, i) =>
      Bodies.rectangle(restPositions[i].x, restPositions[i].y, item.width * 1.8, 26, {
        isStatic: true,
        friction: 0.6,
        collisionFilter: { category: platformCategory(i) },
      }),
    );
    const safetyFloor = Bodies.rectangle(width / 2, height - 10, width * 2, 20, {
      isStatic: true,
      collisionFilter: { category: DEFAULT_CATEGORY },
    });
    const leftWall = Bodies.rectangle(-20, height / 2, 40, height * 2, {
      isStatic: true,
      collisionFilter: { category: DEFAULT_CATEGORY },
    });
    const rightWall = Bodies.rectangle(width + 20, height / 2, 40, height * 2, {
      isStatic: true,
      collisionFilter: { category: DEFAULT_CATEGORY },
    });

    // All falling bodies share one negative collision group so they never
    // bump into each other mid-fall. Each body's mask further limits it to
    // walls/safety-floor plus its own platform's category, so it can't land
    // on someone else's spot.
    const bodies = items.map((item, i) =>
      Bodies.rectangle(restPositions[i].x, -200 - i * 160, item.width, item.height, {
        restitution: 0,
        friction: 0.6,
        frictionAir: 0.02,
        angularVelocity: (Math.random() - 0.5) * 0.15,
        collisionFilter: {
          group: -1,
          category: DEFAULT_CATEGORY,
          mask: DEFAULT_CATEGORY | platformCategory(i),
        },
      }),
    );

    Composite.add(engine.world, [...platforms, safetyFloor, leftWall, rightWall, ...bodies]);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // Eased parallax offset per item, layered on top of its physics position.
    const parallax = items.map(() => ({ x: 0, y: 0 }));

    let frame: number;
    const sync = () => {
      const mouseX = mousePositionRef.current.x;
      const mouseY = mousePositionRef.current.y;

      bodies.forEach((body, i) => {
        const el = elRefs.current[i];
        if (!el) return;
        const item = items[i];

        const strength = (item.depth * PARALLAX_SENSITIVITY) / 20;
        const targetX = mouseX * strength;
        const targetY = mouseY * strength;
        const p = parallax[i];
        p.x += (targetX - p.x) * PARALLAX_EASING;
        p.y += (targetY - p.y) * PARALLAX_EASING;

        const x = body.position.x - item.width / 2 + p.x;
        const y = body.position.y - item.height / 2 + p.y;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
      });
      frame = requestAnimationFrame(sync);
    };
    sync();

    return () => {
      cancelAnimationFrame(frame);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [mousePositionRef, avoidRef]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-screen -translate-x-1/2 overflow-hidden lg:block"
    >
      {items.map((item, i) => (
        <div
          key={item.key}
          ref={(el) => {
            elRefs.current[i] = el;
          }}
          className="absolute left-0 top-0"
          style={{ width: item.width, height: item.height, willChange: "transform" }}
        >
          {item.node}
        </div>
      ))}
    </div>
  );
}
