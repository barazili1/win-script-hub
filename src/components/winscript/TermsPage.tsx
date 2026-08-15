import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeDollarSign,
  CheckCircle2,
  Copy,
  Download,
  Play,
  Send,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { TopBar } from "./TopBar";
import { LoadingDialog } from "./LoadingDialog";
import { GAMES, type Platform } from "./platforms";

const PROMO = "BTR1";

function ConditionCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="rounded-2xl glass-panel p-4"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="min-w-0 text-sm font-bold text-foreground">{title}</h2>
        {badge}
      </div>
      {children}
    </motion.section>
  );
}

const whiteBtn =
  "flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-foreground font-bold text-background transition-opacity hover:opacity-90";

export function TermsPage({ platform }: { platform: Platform | null }) {
  const [userId, setUserId] = useState("");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [loadingGame, setLoadingGame] = useState(false);
  const [isPromoModalOpen, setPromoModalOpen] = useState(false);

  const platformName = platform?.name ?? "المنصة";

  const copyPromo = async () => {
    try {
      await navigator.clipboard.writeText(PROMO);
    } catch {
      /* clipboard unavailable */
    }
    toast("تم نسخ البروموكود");
  };

  const pickGame = (id: string) => {
    if (loadingGame) return;
    setLoadingGame(true);
    setTimeout(() => {
      setLoadingGame(false);
      setSelectedGame(id);
      toast("تم الاتصال باللعبة المطلوبة");
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen"
    >
      <TopBar />
      <main className="mx-auto max-w-md px-4 pt-6">
        <h1 className="mb-6 text-center text-lg font-bold text-muted-foreground">
          الرجاء إكمال الشروط الآتية
        </h1>

        <div className="space-y-4">
          <ConditionCard
            title={`تحميل منصة ${platformName} الرسمية`}
            badge={
              platform ? (
                <img
                  src={platform.image}
                  alt={platform.name}
                  loading="lazy"
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-neon/40"
                />
              ) : null
            }
          >
            <button type="button" className={`${whiteBtn} mt-3`}>
              <Download className="h-4 w-4" />
              تثبيت المنصة
            </button>
          </ConditionCard>

          <ConditionCard
            title="الانضمام إلى قناة التلجرام"
            badge={
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-black/60 ring-1 ring-neon/40">
                <Send className="h-5 w-5 text-neon" />
              </span>
            }
          >
            <button type="button" className={`${whiteBtn} mt-3`}>
              {"انضمام >"}
            </button>
          </ConditionCard>

          <ConditionCard title={`التسجيل بالبروموكود الخاص بالاسكربت ${PROMO}`}>
            <div className="mt-3 flex h-12 w-full items-center justify-between rounded-xl border border-border bg-black/50 px-3">
              <span className="text-lg font-extrabold tracking-widest neon-text">{PROMO}</span>
              <button
                type="button"
                onClick={copyPromo}
                className="flex items-center gap-1.5 rounded-lg border border-neon/40 bg-neon/10 px-3 py-1.5 text-xs font-bold text-neon"
              >
                <Copy className="h-3.5 w-3.5" />
                نسخ الكود
              </button>
            </div>
            <button
              type="button"
              onClick={() => setPromoModalOpen(true)}
              className={`${whiteBtn} mt-3`}
            >
              <UserPlus className="h-4 w-4" />
              تسجيل
            </button>
          </ConditionCard>

          <ConditionCard title="إيداع مبلغ بحد أدنى 300 جنيه أو 6 دولار">
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-black/50 p-3 text-center">
                <span className="text-2xl">🇪🇬</span>
                <p className="mt-1 text-lg font-extrabold text-neon">300 EGP</p>
              </div>
              <div className="rounded-xl border border-border bg-black/50 p-3 text-center">
                <BadgeDollarSign className="mx-auto h-6 w-6 text-neon" />
                <p className="mt-1 text-lg font-extrabold text-neon">$6 USD</p>
              </div>
            </div>
          </ConditionCard>

          <ConditionCard title="إدخل الـ ID الخاص بك">
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              inputMode="numeric"
              placeholder="أدخل رقم الـ ID هنا..."
              className="mt-3 h-12 w-full rounded-xl border border-border bg-black/50 px-4 text-foreground outline-none placeholder:text-muted-foreground focus:border-neon"
            />
          </ConditionCard>

          <ConditionCard title="اختيار اللعبة المطلوبة">
            <div className="mt-3 grid grid-cols-2 gap-3">
              {GAMES.map((g) => (
                <motion.button
                  key={g.id}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => pickGame(g.id)}
                  className={`relative flex h-[60px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border bg-black/50 text-sm font-bold transition-colors hover:border-neon ${
                    selectedGame === g.id ? "border-neon" : "border-border"
                  }`}
                >
                  {g.name}
                  {selectedGame === g.id && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute left-1.5 top-1.5"
                    >
                      <CheckCircle2 className="h-5 w-5 text-neon" />
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </ConditionCard>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!userId.trim()) {
              toast("الرجاء إدخال الـ ID الخاص بك");
              return;
            }
            if (!selectedGame) {
              toast("الرجاء اختيار اللعبة المطلوبة");
              return;
            }
            toast("جارٍ التحقق من البيانات...");
          }}

          className="mb-12 mt-8 h-12 w-full rounded-xl bg-foreground text-lg font-extrabold text-background shadow-lg transition-opacity hover:opacity-90"
        >
          التحقق
        </button>
      </main>

      <LoadingDialog open={loadingGame} />

      <AnimatePresence>
        {isPromoModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPromoModalOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="w-full max-w-md rounded-2xl glass-panel p-4"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <h3 className="min-w-0 truncate text-sm font-bold">طريقة التسجيل بالبروموكود</h3>
                <button
                  type="button"
                  onClick={() => setPromoModalOpen(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-neon/15 ring-1 ring-neon/50 neon-glow">
                    <Play className="h-6 w-6 text-neon" />
                  </span>
                </div>
                <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-[11px] text-muted-foreground">
                  02:14
                </span>
              </div>

              <button type="button" className={`${whiteBtn} mt-4`}>
                استمرار للتسجيل
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
