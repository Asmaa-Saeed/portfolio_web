"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, X, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/data/projects";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, video[controls], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Props = { project: Project; onClose: () => void };

export function DemoModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const titleId = `demo-title-${project.slug}`;

  // Scroll lock, initial focus, ESC and the focus trap.
  useEffect(() => {
    lockScroll();
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const video = videoRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      video?.pause();
      unlockScroll();
    };
  }, [onClose]);

  // Start playback right after the click that opened the modal (falls back to controls).
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const meta = [project.role, project.date].filter(Boolean).join(" · ");
  const ease = [0.22, 1, 0.36, 1] as const;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04050c]/80 p-3 backdrop-blur-md sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.25 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-y-auto overscroll-contain rounded-2xl border border-line-strong bg-surface shadow-[0_40px_120px_-40px_rgba(109,63,224,0.55)] sm:max-h-[calc(100dvh-3rem)] lg:flex-row lg:overflow-hidden"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: reduced ? 0 : 0.35, ease }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close demo"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full border border-line-strong bg-bg/80 text-text backdrop-blur transition-colors hover:bg-accent"
        >
          <X size={18} />
        </button>

        <div className="flex shrink-0 justify-center bg-bg/70 p-4 pt-16 sm:p-6 lg:pt-6">
          <div className="relative aspect-[9/16] h-[min(62dvh,640px)] overflow-hidden rounded-xl border border-line bg-black lg:h-[min(calc(100dvh-6rem),800px)]">
            {project.video.type === "youtube" ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${project.video.id}?autoplay=1&playsinline=1&rel=0`}
                title={`${project.title} demo video`}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : videoFailed ? (
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.poster} alt="" className="h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <VideoCamera size={28} className="text-accent-soft" />
                  <p className="text-sm text-text">Demo video coming soon</p>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={project.video.src}
                poster={project.poster}
                controls
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
                aria-label={`${project.title} demo video`}
              />
            )}
          </div>
        </div>

        <div className="flex-1 p-6 sm:p-8 lg:overflow-y-auto lg:overscroll-contain lg:pr-14">
          <p className="text-sm text-accent-soft">{meta}</p>
          <h2 id={titleId} className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">
            {project.title}
          </h2>

          <dl className="mt-8 space-y-6">
            {[
              ["The problem", project.problem],
              ["What I built", project.solution],
              ["Result", project.result],
            ].map(([label, body]) => (
              <div key={label as string}>
                <dt className="text-xs font-medium uppercase tracking-wider text-faint">{label}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                  {Array.isArray(body) ? (
                    <ol className="space-y-3">
                      {body.map((step, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-xs font-medium text-accent-soft">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    body
                  )}
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-faint">Tech stack</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent-soft">
                      {tag}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          {project.links && project.links.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm text-text transition-colors hover:border-accent"
                  >
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
