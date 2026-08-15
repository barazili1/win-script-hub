import logo from "@/assets/win-script-logo.png";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 glass-panel border-x-0 border-t-0 border-b border-b-neon/30 shadow-[0_6px_24px_-12px_var(--neon)]">
      <div className="mx-auto flex h-14 max-w-md items-center gap-3 px-4">
        <img
          src={logo}
          alt="WIN SCRIPT"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full ring-1 ring-neon/50 p-0.5"
        />
        <span className="text-lg font-extrabold tracking-wider">
          <span className="neon-text">WIN</span> SCRIPT
        </span>
      </div>
    </header>
  );
}
