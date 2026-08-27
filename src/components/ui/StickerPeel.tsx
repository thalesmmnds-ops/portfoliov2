"use client";

import { useEffect, useId, useRef } from "react";
import "./StickerPeel.css";

// Adapted from reactbits.dev's StickerPeel (https://reactbits.dev/animations/sticker-peel).
// Takes arbitrary content instead of an `imageSrc` — the "sticker face" is
// rendered twice (once for the peel-back top layer, once flattened to a
// grey silhouette for the paper backing underneath), and an SVG
// feSpecularLighting filter tracks the cursor across it for a glossy
// highlight. Dragging and the fixed image tilt from the original aren't
// reproduced — see StickerPeel.css for why.
export function StickerPeel({
  children,
  peelBackHoverPct = 18,
  peelBackActivePct = 26,
  shadowIntensity = 0.5,
  lightingIntensity = 0.15,
  className = "",
}: {
  children: React.ReactNode;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const pointLightRef = useRef<SVGFEPointLightElement>(null);
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateLight = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointLightRef.current?.setAttribute("x", String(x));
      pointLightRef.current?.setAttribute("y", String(y));
      pointLightFlippedRef.current?.setAttribute("x", String(x));
      pointLightFlippedRef.current?.setAttribute("y", String(rect.height - y));
    };

    const handleTouchStart = () => container.classList.add("touch-active");
    const handleTouchEnd = () => container.classList.remove("touch-active");

    container.addEventListener("mousemove", updateLight);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      container.removeEventListener("mousemove", updateLight);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return (
    <div
      className={className}
      style={
        {
          "--sticker-peelback-hover": `${peelBackHoverPct}%`,
          "--sticker-peelback-active": `${peelBackActivePct}%`,
        } as React.CSSProperties
      }
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id={`pointLight-${uid}`}>
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent={100}
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={pointLightRef} x="0" y="0" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={`pointLightFlipped-${uid}`}>
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent={100}
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight ref={pointLightFlippedRef} x="0" y="0" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={`dropShadow-${uid}`}>
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation={3 * shadowIntensity}
              floodColor="black"
              floodOpacity={shadowIntensity}
            />
          </filter>

          <filter id={`expandAndFill-${uid}`}>
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div className="sticker-peel-container" ref={containerRef}>
        <div className="sticker-peel-main" style={{ filter: `url(#dropShadow-${uid})` }}>
          <div style={{ filter: `url(#pointLight-${uid})` }}>{children}</div>
        </div>
        <div className="sticker-peel-flap">
          <div style={{ filter: `url(#pointLightFlipped-${uid})` }}>
            <div style={{ filter: `url(#expandAndFill-${uid})` }}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
