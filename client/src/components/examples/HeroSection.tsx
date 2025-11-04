import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div id="about" className="h-96 flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Scroll target (About section)</p>
      </div>
    </div>
  );
}
