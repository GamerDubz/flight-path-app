"use client";

import { useRouter } from "next/navigation";
import { FirstVisitOnboarding } from "./first-visit-onboarding";

export default function OnboardingPage() {
  const router = useRouter();

  return <FirstVisitOnboarding onComplete={() => router.replace("/home")} />;
}
