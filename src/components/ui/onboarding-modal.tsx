"use client";

import { useEffect, useState } from "react";
import { AppIcon, type AppIconName } from "@/components/ui/app-icon";

const STORAGE_KEY = "flight-path-onboarding-dismissed";

const steps = [
  {
    icon: "explore",
    title: "See your route",
    body: "Your flights turn into a live globe so the app feels like a travel log, not a spreadsheet.",
  },
  {
    icon: "add_circle",
    title: "Log your next flight",
    body: "Add a trip from the home screen and it updates your stats, globe, and history together.",
  },
  {
    icon: "book",
    title: "Keep your passport moving",
    body: "Track countries, miles, and progress in one place as your travel history grows.",
  },
] as const;

export function OnboardingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const dismissed = window.localStorage.getItem(STORAGE_KEY);
        setOpen(!dismissed);
      } catch {
        setOpen(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage failures and just close the modal.
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-4 py-4">
      <button
        type="button"
        aria-label="Dismiss onboarding"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={dismiss}
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-(--color-outline-variant) bg-white shadow-[0_24px_80px_rgba(10,17,40,0.18)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#007AFF] via-[#34C759] to-[#FF9500]" />

        <div className="grid gap-0 sm:grid-cols-[1.2fr_0.9fr]">
          <div className="p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#007AFF]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#007AFF]">
              Welcome
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
              Flight Path starts with a quick tour
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-(--color-on-surface-variant)">
              You only need one minute to understand the app. After that, it stays out of the way.
            </p>

            <div className="mt-6 space-y-4">
              {steps.map((step) => (
                <div key={step.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-(--color-surface-container-low) text-[#007AFF]">
                    <AppIcon name={step.icon as AppIconName} filled className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-(--color-on-surface-variant)">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex items-center justify-center rounded-full bg-[#007AFF] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0067d4]"
              >
                Get started
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex items-center justify-center rounded-full border border-(--color-outline-variant) px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-(--color-surface-container-low)"
              >
                Skip tour
              </button>
            </div>
          </div>

          <div className="relative min-h-[260px] bg-linear-to-br from-[#061326] via-[#0b2044] to-[#08101f] p-6 sm:p-8">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.24),_transparent_55%)]" />
            <div className="relative flex h-full flex-col justify-between text-white">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/65">What you’ll see</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Globe</div>
                    <div className="mt-1 text-lg font-extrabold">Every route updates live</div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Stats</div>
                    <div className="mt-1 text-lg font-extrabold">Miles, countries, and progress</div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Passport</div>
                    <div className="mt-1 text-lg font-extrabold">A cleaner view of your travel history</div>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-5 text-white/55">
                You can reopen this by clearing site storage for the app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
