"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ShieldAlert, LogOut, Flame, Heart, User, CheckCircle } from "lucide-react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

export default function GameRoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomId = params.id as string;
  const intensityTier = searchParams.get("tier") || "flirty";
  
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [gameState, setGameState] = useState<"consent" | "waiting" | "playing">("consent");
  const [currentTurn, setCurrentTurn] = useState("Player 1");
  const [flipped, setFlipped] = useState(false);
  const [reported, setReported] = useState(false);
  const [cardContent, setCardContent] = useState<null | { type: "truth" | "dare", text: string }>(null);

  useEffect(() => {
    const match = document.cookie.match(new RegExp('(^| )test_user=([^;]+)'));
    if (match) setCurrentPlayer(match[2]);
  }, []);

  const isMyTurn = currentTurn === currentPlayer;
  const otherPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";

  const handleConsent = () => setGameState("playing");

  const handleLeave = () => {
    router.push("/dashboard");
  };

  const handleReport = () => {
    setReported(true);
    setTimeout(() => setReported(false), 3000);
  };

  const drawCard = () => {
    if (!isMyTurn) return;
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
      setCurrentTurn(otherPlayer);
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
              This room is set to <strong className="capitalize">{intensityTier}</strong> intensity. 
              <br /><br />
              Remember: You can leave at any time, skip any question, and report users who violate guidelines. Play safe and have fun.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button variant="outline" className="border-white/10" onClick={handleLeave}>Leave Room</Button>
            <Button onClick={handleConsent} className="bg-primary hover:bg-primary/90 text-white">I Agree, Let's Play</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-4xl mx-auto space-y-8">
      {/* Room Header */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center px-4 gap-4">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-muted-foreground flex items-center gap-1">
            <Flame className="w-3 h-3 text-primary" /> <span className="capitalize">{intensityTier}</span>
          </span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-muted-foreground">
            Room: {roomId?.slice(0,6)}
          </span>
        </div>

        {/* Players List */}
        <div className="flex items-center gap-4 sm:gap-6 glass px-4 sm:px-6 py-2 rounded-full border border-white/10">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPlayer === 'Player 1' ? 'bg-primary/20 text-primary' : 'bg-indigo-500/20 text-indigo-400'}`}>
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">You</span>
              <span className="text-[10px] text-muted-foreground hidden sm:block">{currentPlayer}</span>
            </div>
          </div>
          <span className="text-muted-foreground/50 italic text-sm">vs</span>
          <div className="flex items-center gap-2">
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold">Partner</span>
              <span className="text-[10px] text-muted-foreground hidden sm:block">{otherPlayer} (Remote)</span>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${otherPlayer === 'Player 1' ? 'bg-primary/20 text-primary' : 'bg-indigo-500/20 text-indigo-400'}`}>
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleReport}
            className={reported ? "text-green-400 hover:text-green-300 hover:bg-green-950/30" : "text-red-400 hover:text-red-300 hover:bg-red-950/30"}
          >
            {reported ? <CheckCircle className="w-4 h-4 mr-2" /> : <ShieldAlert className="w-4 h-4 mr-2" />}
            {reported ? "Reported" : "Report"}
          </Button>
          <Button variant="outline" size="sm" className="border-white/10" onClick={handleLeave}>
            <LogOut className="w-4 h-4 mr-2" /> Leave
          </Button>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[400px]">
        <div className="text-center mb-8 h-16">
          <h2 className="text-3xl font-bold mb-2">
            {isMyTurn ? "Your Turn!" : `Waiting for ${currentTurn}...`}
          </h2>
          <p className="text-muted-foreground">
            {isMyTurn ? "Tap the deck to draw a card." : "They are deciding their fate."}
          </p>
        </div>

        {/* Card Flip Mechanism */}
        <div 
          className={`relative w-72 h-96 [perspective:1000px] ${isMyTurn && !flipped ? 'cursor-pointer group' : 'cursor-not-allowed opacity-80'}`}
          onClick={!flipped && isMyTurn ? drawCard : undefined}
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
          {isMyTurn ? (
            <>
              <Button variant="outline" size="lg" className="border-white/10 w-32" onClick={nextTurn}>
                Skip
              </Button>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-32" onClick={nextTurn}>
                Done
              </Button>
            </>
          ) : (
            <p className="text-muted-foreground animate-pulse">Remote player is answering...</p>
          )}
        </div>
      </div>
    </div>
  );
}
