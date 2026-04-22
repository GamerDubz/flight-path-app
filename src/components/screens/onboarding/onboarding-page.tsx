"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FirstVisitOnboarding,
  ONBOARDING_STORAGE_KEY,
} from "./first-visit-onboarding";

export default function OnboardingPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const completed = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
        if (completed) {
          router.replace("/home");
          return;
        }
      } finally {
        setIsReady(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f9f9fb] text-[#1a1c1d]">
        <div className="animate-fp-fade-up flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0058bc]/10">
            <span className="h-5 w-5 rounded-full bg-[#0058bc]" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#717786]">
              Flight Path
            </div>
            <div className="text-sm text-[#414755]">Preparing onboarding</div>
          </div>
        </div>
      </div>
    );
  }

  return <FirstVisitOnboarding onComplete={() => router.replace("/home")} />;
}
