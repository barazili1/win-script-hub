import { motion } from "framer-motion";
import { useEffect } from "react";
import logo from "@/assets/win-script-logo.png";

export function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-neon/15 blur-[90px]" />

      <div className="relative grid h-32 w-32 place-items-center rounded-full glass-panel border-neon/60 animate-breathe">
        <img src={logo} alt="WIN SCRIPT" width={80} height={80} className="h-20 w-20" />
      </div>

      <h1 className="relative mt-6 text-3xl font-extrabold tracking-wider">
        <span className="neon-text">WIN</span> <span>SCRIPT</span>
      </h1>

      <div className="relative mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-neon shadow-[0_0_12px_var(--neon)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
        />
      </div>

      <p className="relative mt-4 text-xs text-muted-foreground">جارٍ تهيئة الاسكربت...</p>
    </motion.div>
  );
}
