"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ShieldAlert, LogOut, Flame, Heart } from "lucide-react";
import { useParams } from "next/navigation";

export default function GameRoomPage() {
  const params = useParams();
  const roomId = params.id as string;
  
  const [gameState, setGameState] = useState<"consent" | "waiting" | "playing">("consent");
  const [currentTurn, setCurrentTurn] = useState("Player 1");
  const [flipped, setFlipped] = useState(false);
  const [cardContent, setCardContent] = useState<null | { type: "truth" | "dare", text: string }>(null);

  const handleConsent = () => setGameState("playing");

  const drawCard = () => {
    // Scaffold: Simulated card draw
    setCardContent(Math.random() > 0.5 
      ? { type: "truth", text: "What's a secret you've never told anyone here?" }
      : { type: "dare", text: "Show the last photo you took on your phone." }
    );
    setFlipped(true);
  };

  const nextTurn = () => {
    setFlipped(false);
    setTimeout(() => {
      setCardContent(null);
      setCurrentTurn(currentTurn === "Player 1" ? "Player 2" : "Player 1");
    }, 300);
  };

  if (gameState === "consent") {
    return (
      <Dialog open={true}>
        <DialogContent className="glass border-white/10 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <ShieldAlert className="w-5 h-5 text-indigo-500" />
              Consent Check
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              This room is set to <strong>Flirty</strong> intensity. 
              <br /><br />
              Remember: You can leave at any time, skip any question, and report users who violate guidelines. Play safe and have fun.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button variant="outline" className="border-white/10">Leave Room</Button>
            <Button onClick={handleConsent} className="bg-primary hover:bg-primary/90 text-white">I Agree, Let's Play</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-4xl mx-auto space-y-8">
      {/* Room Header */}
      <div className="w-full flex justify-between items-center px-4">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-muted-foreground flex items-center gap-1">
            <Flame className="w-3 h-3 text-primary" /> Flirty Tier
          </span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-muted-foreground">
            Room: {roomId?.slice(0,6)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950/30">
            <ShieldAlert className="w-4 h-4 mr-2" /> Report
          </Button>
          <Button variant="outline" size="sm" className="border-white/10">
            <LogOut className="w-4 h-4 mr-2" /> Leave
          </Button>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[400px]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">{currentTurn}'s Turn</h2>
          <p className="text-muted-foreground">Draw a card when you're ready.</p>
        </div>

        {/* Card Flip Mechanism */}
        <div 
          className="relative w-72 h-96 [perspective:1000px] cursor-pointer group"
          onClick={!flipped ? drawCard : undefined}
        >
          <div className={`w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
            
            {/* Card Back */}
            <Card className="absolute inset-0 [backface-visibility:hidden] glass border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <Heart className="w-10 h-10 text-primary" />
              </div>
            </Card>

            {/* Card Front */}
            <Card className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] glass border-white/10 flex flex-col p-6 items-center justify-center text-center card-glow bg-gradient-to-br from-white/10 to-transparent">
              {cardContent && (
                <>
                  <span className={`text-sm font-bold uppercase tracking-widest mb-4 ${cardContent.type === 'truth' ? 'text-indigo-400' : 'text-pink-400'}`}>
                    {cardContent.type}
                  </span>
                  <p className="text-2xl font-bold leading-tight">
                    {cardContent.text}
                  </p>
                </>
              )}
            </Card>
            
          </div>
        </div>

        {/* Actions */}
        <div className={`mt-12 transition-opacity duration-300 flex gap-4 ${flipped ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <Button variant="outline" size="lg" className="border-white/10 w-32" onClick={nextTurn}>
            Skip
          </Button>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-32" onClick={nextTurn}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
