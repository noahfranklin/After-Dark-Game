import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Users, ShieldAlert } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50" />
      
      <div className="max-w-3xl space-y-8 glass p-12 rounded-3xl relative z-10 border border-white/5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>The Ultimate Intimacy Game</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Welcome to <br />
          <span className="text-gradient">After Dark</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          A game of Truth or Dare designed for couples and groups. Connect deeper, flirt harder, and explore boundaries in a safe, synchronized digital room.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link href="/signup">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105">
              Start Playing Free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5 transition-all">
              Log in to Account
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full z-10 text-left">
        <FeatureCard 
          icon={<Heart className="w-8 h-8 text-pink-500" />}
          title="Couples & Groups"
          description="Play 1-on-1 with your partner, or match up with up to 6 players for an unforgettable group night."
        />
        <FeatureCard 
          icon={<Users className="w-8 h-8 text-purple-500" />}
          title="Random Matchmaking"
          description="Feeling adventurous? Opt into our secure queue and meet open-minded strangers based on your preferences."
        />
        <FeatureCard 
          icon={<ShieldAlert className="w-8 h-8 text-indigo-500" />}
          title="Safe & Synchronized"
          description="Real-time syncing so no one can cheat. Built-in consent gates, reporting, and blocking keep you safe."
        />
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex flex-col gap-4">
      <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
