"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, XCircle } from "lucide-react";

export default function MatchmakingPage() {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<"searching" | "found">("searching");

  useEffect(() => {
    // Scaffold: Simulate matchmaking delay and redirect
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    const matchTimer = setTimeout(() => {
      setStatus("found");
      setTimeout(() => {
        router.push("/room/match-1234");
      }, 2000);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(matchTimer);
    };
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto w-full">
      <div className="glass p-12 rounded-3xl border border-white/10 w-full flex flex-col items-center space-y-8 relative overflow-hidden">
        
        {/* Animated background pulse */}
        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center space-y-4">
          {status === "searching" ? (
            <>
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white/10 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{elapsed}s</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Searching for players...</h2>
                <p className="text-muted-foreground">Looking for a 4-player group in the Flirty tier.</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-bounce">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-primary">Match Found!</h2>
                <p className="text-muted-foreground">Connecting you to the room...</p>
              </div>
            </>
          )}
        </div>

        {status === "searching" && (
          <Button variant="outline" size="lg" className="relative z-10 border-white/10 w-full" onClick={() => router.push("/dashboard")}>
            <XCircle className="w-4 h-4 mr-2" /> Cancel Search
          </Button>
        )}
      </div>
    </div>
  );
}
