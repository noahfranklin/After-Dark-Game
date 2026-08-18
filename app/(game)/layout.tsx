import Link from "next/link";
import { User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function GameLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const testUser = cookieStore.get("test_user")?.value || "Player 1";
  const isPlayer2 = testUser === "Player 2";

  async function handleLogout() {
    "use server";
    const store = await cookies();
    store.delete("test_user");
    // TODO: Add Supabase signOut logic here in the future
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Subtle ambient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 glass">
        <Link href="/dashboard" className="text-xl font-extrabold tracking-tight">
          <span className="text-gradient">After Dark</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isPlayer2 ? 'bg-indigo-500/20' : 'bg-primary/20'}`}>
              <User className={`w-4 h-4 ${isPlayer2 ? 'text-indigo-400' : 'text-primary'}`} />
            </div>
            <span className="text-sm font-medium">{testUser}</span>
          </div>
          <form action={handleLogout}>
            <Button type="submit" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" title="Log Out">
              <LogOut className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-6">
        {children}
      </main>
    </div>
  );
}
