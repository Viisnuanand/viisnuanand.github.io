import { useEffect, useRef, useState } from "react";
import profileImage from "@assets/DSC_0335 resized_1762260943541.jpg";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  const skills = [
    "Raspberry Pi",
    "Jetson Orin Nano",
    "ESP",
    "Drones",
    "Software Defined Radio",
    "GNU Radio",
    "Self Learning",
    "Time Management",
    "Easy Learner",
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-about">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Viisnu Anand S"
                  className="rounded-full w-64 h-64 object-cover border-4 border-primary/20"
                  data-testid="img-profile"
                />
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground" data-testid="text-bio">
                I'm an Electronics & Communication Engineering student (Kumaraguru
                College of Technology) passionate about robotics, drones,
                embedded systems, and AI-driven signal processing.
              </p>

              <div>
                <h3 className="text-2xl font-semibold mb-4" data-testid="heading-skills">Skills</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-muted px-4 py-2 rounded-md hover-elevate transition-all duration-300"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                      data-testid={`skill-${index}`}
                    >
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
