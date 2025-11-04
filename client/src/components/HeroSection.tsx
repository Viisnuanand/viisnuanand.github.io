import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import resumePdf from "@assets/Viisnu Anand S Resume_1762261237604.pdf";

export default function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Hi, I'm <span className="text-primary">Viisnu Anand S</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground">
            Electronics & Communication Engineer | Robotics & Drones Enthusiast
          </p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="group"
              data-testid="button-explore-more"
            >
              Explore More
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              data-testid="button-download-resume"
            >
              <a href={resumePdf} download="Viisnu_Anand_S_Resume.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
