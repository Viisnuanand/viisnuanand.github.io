import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import resumePdf from "@assets/Viisnu Anand S Resume_1762261237604.pdf";

export default function ContactSection() {
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

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:viisnuanand.s@gmail.com",
      testId: "link-email",
    },
    {
      name: "Phone",
      icon: Phone,
      href: "tel:+919443742244",
      testId: "link-phone",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/viisnu-anand/",
      testId: "link-linkedin",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" data-testid="heading-contact">
            Get In Touch
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12" data-testid="text-contact-description">
            Feel free to reach out for collaborations, opportunities, or just to
            connect!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  asChild
                  className="hover-elevate active-elevate-2 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={link.testId}
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {link.name}
                  </a>
                </Button>
              );
            })}
            <Button
              variant="default"
              size="lg"
              asChild
              className="hover-elevate active-elevate-2 transition-all duration-300"
              style={{
                animationDelay: `${socialLinks.length * 100}ms`,
              }}
            >
              <a
                href={resumePdf}
                download="Viisnu_Anand_S_Resume.pdf"
                data-testid="button-download-resume-contact"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>

          <div className="mt-16 text-center text-sm text-muted-foreground">
            <p data-testid="text-footer">
              © {new Date().getFullYear()} Viisnu Anand S. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
