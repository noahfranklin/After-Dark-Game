"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Flame, Heart, Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto w-full space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Choose Your Experience</h1>
        <p className="text-muted-foreground">Play privately with a partner or meet someone new.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Private Room Card */}
        <Card className="glass border-white/10 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader>
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-4 border border-pink-500/30">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
            <CardTitle className="text-2xl">Private Room</CardTitle>
            <CardDescription className="text-base">
              Create a private session and invite your partner with a secure code.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="font-medium">Intensity</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">Sweet</span>
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Flirty</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">Deep</span>
                </div>
              </div>
            </div>
            <Link href="/room/new-private" className="block w-full">
              <Button className="w-full h-12 text-lg bg-pink-600 hover:bg-pink-700 text-white shadow-[0_0_20px_-5px_rgba(219,39,119,0.5)]">
                Create Room
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Random Matchmaking Card */}
        <Card className="glass border-white/10 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-4 border border-indigo-500/30">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <CardTitle className="text-2xl">Random Match</CardTitle>
            <CardDescription className="text-base">
              Match with strangers for a thrilling group or couple experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="font-medium">Group Size</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">2 (1 on 1)</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">4</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">6</span>
                </div>
              </div>
            </div>
            <Link href="/matchmaking" className="block w-full">
              <Button className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]">
                Find Match
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Stats/History (Optional) */}
      <div className="pt-8">
        <h2 className="text-xl font-bold mb-4">Recent Sessions</h2>
        <div className="glass rounded-xl border border-white/5 p-8 text-center text-muted-foreground flex flex-col items-center justify-center min-h-[200px]">
          <Sparkles className="w-8 h-8 mb-4 opacity-50" />
          <p>No recent sessions yet. Start playing!</p>
        </div>
      </div>
    </div>
  );
}
