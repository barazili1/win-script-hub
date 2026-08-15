import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { TopBar } from "./TopBar";
import { LoadingDialog } from "./LoadingDialog";
import { LiveWinsFeed } from "./LiveWinsFeed";
import { PLATFORMS, type Platform } from "./platforms";

export function PlatformPage({
  selected,
  onSelect,
  onContinue,
}: {
  selected: Platform | null;
  onSelect: (p: Platform) => void;
  onContinue: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSelect = (p: Platform) => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSelect(p);
      toast("تم الاتصال بخوادم المنصة بنجاح", {
        icon: (
          <img
            src={p.image}
            alt={p.name}
            width={24}
            height={24}
            className="h-6 w-6 rounded-md object-cover"
          />
        ),
      });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pb-16"
    >
      <TopBar />
      <main className="mx-auto max-w-md px-4 pt-6">
        <h1 className="mb-6 text-center text-xl font-bold">اختيار المنصة المطلوبة</h1>

        <div className="space-y-4">
          {PLATFORMS.map((p) => {
            const active = selected?.id === p.id;
            return (
              <motion.button
                key={p.id}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(p)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border bg-panel p-4 text-right shadow-lg transition-all duration-300 hover:border-neon ${
                  active ? "border-neon neon-glow" : "border-border"
                }`}
              >
                <span className="text-xl font-bold">{p.name}</span>
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={100}
                  height={100}
                  className="h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[25px] object-cover"
                />
              </motion.button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            if (!selected) {
              toast("الرجاء اختيار المنصة أولاً");
              return;
            }
            onContinue();
          }}
          className="mt-6 flex h-[40px] w-full items-center justify-center gap-2 rounded-xl bg-foreground font-bold text-background transition-colors hover:opacity-90"
        >
          متابعة
          <ArrowLeft className="h-4 w-4" />
        </button>

        <LiveWinsFeed />
      </main>
      <LoadingDialog open={loading} />
    </motion.div>
  );
}
