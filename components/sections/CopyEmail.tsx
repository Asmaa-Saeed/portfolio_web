"use client";

import { useEffect, useState } from "react";
import { Check, Copy, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Older browsers / insecure contexts.
      const input = document.createElement("textarea");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
  };

  return (
    <div className="rounded-2xl border border-accent/35 bg-gradient-to-br from-accent/[0.14] to-surface p-5 sm:p-6">
      <p className="flex items-center gap-2 text-xs text-muted">
        <EnvelopeSimple size={14} />
        Email
      </p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${email}`}
          className="break-all font-display text-xl font-medium text-text transition-colors hover:text-accent-soft sm:text-2xl"
        >
          {email}
        </a>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-deep active:scale-[0.98]"
        >
          {copied ? <Check size={16} weight="bold" /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy email"}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </p>
    </div>
  );
}
