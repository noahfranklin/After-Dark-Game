"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: implement Supabase auth login
    setTimeout(() => setLoading(false), 1000);
  };

  const handleTestLogin = (playerName: string) => {
    // Set a simple cookie for frontend testing
    document.cookie = `test_user=${playerName}; path=/; max-age=86400`;
    router.push("/dashboard");
  };

  return (
    <Card className="glass border-white/10 shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to log in to your account
        </CardDescription>
      </CardHeader>
      
      {/* Test Login Buttons for quick feedback */}
      <div className="px-6 pb-4">
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 space-y-3">
          <p className="text-sm font-medium text-primary text-center">Quick Test Mode</p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="w-full border-primary/30 hover:bg-primary/20"
              onClick={() => handleTestLogin("Player 1")}
            >
              <User className="w-4 h-4 mr-2" /> Player 1
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-400"
              onClick={() => handleTestLogin("Player 2")}
            >
              <User className="w-4 h-4 mr-2" /> Player 2
            </Button>
          </div>
        </div>
      </div>
      
      <div className="relative flex items-center py-2 px-6">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground uppercase">Or</span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required className="bg-white/5 border-white/10 focus-visible:ring-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" required className="bg-white/5 border-white/10 focus-visible:ring-primary" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
