import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { SplashScreen } from "@/components/winscript/SplashScreen";
import { PlatformPage } from "@/components/winscript/PlatformPage";
import { TermsPage } from "@/components/winscript/TermsPage";
import type { Platform } from "@/components/winscript/platforms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WIN SCRIPT — اسكربت الفوز للمنصات" },
      {
        name: "description",
        content:
          "WIN SCRIPT: اختر منصتك، أكمل الشروط، وابدأ مع اسكربت الفوز بواجهة عصرية سريعة وآمنة.",
      },
      { property: "og:title", content: "WIN SCRIPT — اسكربت الفوز للمنصات" },
      {
        property: "og:description",
        content: "اختر المنصة، فعّل البروموكود BTR1، واختر لعبتك المفضلة داخل WIN SCRIPT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [stage, setStage] = useState<"splash" | "platform" | "terms">("splash");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">
        {stage === "splash" && <SplashScreen key="splash" onDone={() => setStage("platform")} />}
        {stage === "platform" && (
          <PlatformPage
            key="platform"
            selected={selectedPlatform}
            onSelect={setSelectedPlatform}
            onContinue={() => setStage("terms")}
          />
        )}
        {stage === "terms" && <TermsPage key="terms" platform={selectedPlatform} />}
      </AnimatePresence>
    </div>
  );
}
