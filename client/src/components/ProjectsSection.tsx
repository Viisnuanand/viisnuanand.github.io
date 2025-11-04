import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Smart India Hackathon 2024",
      description: "AI-Powered DVB-S2X Signal Detection & Classification.",
      details: "Developed an advanced AI-powered system for detecting and classifying DVB-S2X satellite signals. Implemented machine learning algorithms for real-time signal processing and classification, enabling accurate identification of various signal modulation schemes. This project involved deep learning techniques, signal processing fundamentals, and optimization for embedded systems deployment.",
    },
    {
      title: "IRoCu 2025",
      description: "Autonomous UAV Navigation with SLAM and LiDAR.",
      details: "Designed and implemented an autonomous drone navigation system utilizing SLAM (Simultaneous Localization and Mapping) technology integrated with LiDAR sensors. The system enables real-time environment mapping and obstacle avoidance for UAVs in GPS-denied environments. Developed custom algorithms for path planning, sensor fusion, and autonomous decision-making in complex scenarios.",
    },
    {
      title: "Internship – PRICOL Limited",
      description: "Low-cost wire color sequence detection system.",
      details: "Engineered a cost-effective computer vision solution for automated wire color sequence detection in manufacturing environments. Implemented image processing algorithms using OpenCV and developed a custom neural network for color recognition under varying lighting conditions. The system improved quality control efficiency and reduced manual inspection time by 60%.",
    },
  ];

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-projects">
            Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${expandedProject === index ? "md:col-span-3" : ""}`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
                data-testid={`card-project-${index}`}
              >
                <CardHeader className="space-y-0 pb-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                  
                  {expandedProject === index && (
                    <div className="pt-4 border-t animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-foreground leading-relaxed">
                        {project.details}
                      </p>
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleProject(index)}
                    className="w-full mt-2"
                    data-testid={`button-toggle-project-${index}`}
                  >
                    {expandedProject === index ? (
                      <>
                        <ChevronUp className="mr-2 h-4 w-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2 h-4 w-4" />
                        Learn More
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
