import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Clock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

type Mode = "signin" | "signup";

const PartnerLogin = () => {
  useSEO({ title: "Partner Sign In", description: "", noindex: true });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, skip the form.
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate("/partner", { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/partner`,
        },
      });
      setLoading(false);
      if (error) {
        toast({ title: "Sign-up failed", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Account created", description: "Check your inbox to confirm your email, then sign in." });
      setMode("signin");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Sign-in failed", description: error.message, variant: "destructive" });
      return;
    }
    navigate("/partner", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-display font-bold text-center">
            <span className="text-gradient-gold">Time</span> Tracker
          </h1>
          <p className="text-muted-foreground text-sm text-center mt-1">
            {mode === "signin" ? "Sign in to log your hours" : "Create your partner account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium mb-1.5">Full name</label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                className="bg-card border-border"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="bg-card border-border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className="bg-card border-border"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full glow-gold font-display font-semibold">
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />}
            {loading
              ? mode === "signin" ? "Signing in…" : "Creating account…"
              : mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="block mx-auto mt-5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {mode === "signin"
            ? "First time here? Create a partner account →"
            : "Already have an account? Sign in →"}
        </button>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
