import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl">
          <span className="text-gradient-gold">Dubai</span>
          <span className="text-foreground">in</span>
          <span className="text-gradient-gold">Cairo</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          <a href="#contact" className="px-5 py-2 bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wide rounded-lg transition-all hover:brightness-110">
            Get Started
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-6 flex flex-col gap-4">
          <a href="#services" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
          <a href="#contact" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          <a href="#contact" onClick={() => setOpen(false)} className="px-5 py-2.5 bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wide rounded-lg text-center">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
