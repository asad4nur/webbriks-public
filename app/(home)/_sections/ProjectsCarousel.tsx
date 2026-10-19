"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { type MouseEvent, type PointerEvent, type ReactNode, useEffect, useRef, useState } from "react";

const DRAG_THRESHOLD = 6; // px of movement before a press counts as a drag (so normal clicks still work)
const AUTOPLAY_MS = 3500; // time each card rests before the row glides one card to the left

// Horizontal scroll-snap track with prev/next buttons and mouse drag. Touch keeps native swiping.
// Autoplay: one card at a time, right to left, looping back to the start. It waits after any manual
// interaction, only runs while the row is on screen, and is off for visitors who prefer reduced motion.
// Cards are server-rendered and passed in as children.
export default function ProjectsCarousel({
  header,
  cta,
  children,
}: {
  header: ReactNode;
  cta: ReactNode;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const lastInteraction = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setAtStart(track.scrollLeft <= 4);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // --- Autoplay -----------------------------------------------------------------------------------
  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let onScreen = false;
    const observer = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting), { threshold: 0.3 });
    observer.observe(track);

    // Any touch, wheel or press on the row counts as "the visitor is in control" and delays the next move.
    const touched = () => (lastInteraction.current = Date.now());
    track.addEventListener("pointerdown", touched, { passive: true });
    track.addEventListener("wheel", touched, { passive: true });
    track.addEventListener("touchstart", touched, { passive: true });

    const timer = window.setInterval(() => {
      if (!onScreen || document.hidden || drag.current.active) return;
      if (Date.now() - lastInteraction.current < AUTOPLAY_MS * 1.5) return;
      const card = track.querySelector("li");
      if (!card) return;
      const distance = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
      const atLast = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atLast) track.scrollTo({ left: 0, behavior: "smooth" });
      else track.scrollBy({ left: distance, behavior: "smooth" });
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      track.removeEventListener("pointerdown", touched);
      track.removeEventListener("wheel", touched);
      track.removeEventListener("touchstart", touched);
    };
  }, []);

  /** Width of one card plus the gap: the distance between snap points. */
  const step = () => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return 0;
    return card.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
  };

  const behavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  const scrollByCard = (direction: 1 | -1) => {
    lastInteraction.current = Date.now();
    trackRef.current?.scrollBy({ left: direction * step(), behavior: behavior() });
  };

  // --- Mouse drag ---------------------------------------------------------------------------------
  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !trackRef.current) return;
    drag.current = { active: true, moved: false, startX: e.clientX, startLeft: trackRef.current.scrollLeft };
  };

  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    const d = drag.current;
    if (!d.active || !track) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      d.moved = true;
      setDragging(true); // turns off snapping so the row follows the mouse 1:1
      track.setPointerCapture(e.pointerId);
    }
    track.scrollLeft = d.startLeft - dx;
  };

  const endDrag = (e: PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    const d = drag.current;
    if (!d.active || !track) return;
    d.active = false;
    if (!d.moved) return;
    if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    // Glide to the nearest card, then hand control back to CSS snapping.
    const s = step();
    const max = track.scrollWidth - track.clientWidth;
    const target = s ? Math.min(Math.round(track.scrollLeft / s) * s, max) : track.scrollLeft;
    track.scrollTo({ left: target, behavior: behavior() });
    setDragging(false);
  };

  // A drag must not open the project link underneath it.
  const onClickCapture = (e: MouseEvent<HTMLUListElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const button =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm ring-1 ring-ink/10 transition hover:bg-linear-to-br hover:from-brand-orchid hover:to-brand-violet hover:text-white hover:ring-transparent disabled:pointer-events-none disabled:opacity-40";

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {header}
        <div className="flex items-center gap-3">
          {cta}
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Previous projects"
              className={button}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="Next projects"
              className={button}
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={trackRef}
        aria-label="Projects"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className={`-mx-4 mt-10 flex scroll-px-4 gap-4 overflow-x-auto px-4 pt-2 pb-6 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:gap-6 sm:px-6 lg:mt-14 lg:-mx-10 lg:scroll-px-10 lg:px-10 [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing snap-none select-none" : "snap-x snap-mandatory sm:cursor-grab"
        }`}
      >
        {children}
      </ul>

      <p className="flex items-center gap-2 text-xs text-ink/45 sm:hidden">
        Swipe to see more
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </p>
    </div>
  );
}
