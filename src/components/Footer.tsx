const Footer = () => (
  <footer className="py-12 px-6 border-t border-border">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <span className="font-display font-semibold text-foreground">
        <span className="text-gradient-gold">Dubai</span>in<span className="text-gradient-gold">Cairo</span>
      </span>
      <span>© {new Date().getFullYear()} DubaiinCairo. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
