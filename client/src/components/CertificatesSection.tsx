import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, GraduationCap, Building2, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CertificatesSection() {
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

  const certificates = [
    {
      title: "Certificate for Recognition for Excellence in Academic and Cocurricular",
      issuer: "Kumaraguru College of Technology",
      recipient: "Viisnu Anand S",
      date: "August 15, 2024",
      type: "Achievement",
      description: "Recognition for excellence in academic and cocurricular activities.",
      icon: Award,
    },
    {
      title: "Smart India Hackathon 2024 — Senior Software Edition",
      issuer: "Ministry of Education's Innovation Cell, Government of India",
      recipient: "Viisnu Anand S",
      date: "2024",
      type: "Participation",
      description: "Participated in the Smart India Hackathon 2024, Senior Software Edition, contributing to innovative software solutions.",
      icon: Award,
    },
    {
      title: "Embedded Systems and IoT",
      issuer: "NPTEL",
      recipient: "Viisnu Anand S",
      date: "2024",
      type: "Course",
      description: "Completed comprehensive course on Embedded Systems and Internet of Things.",
      icon: GraduationCap,
    },
    {
      title: "Frequency Distribution",
      issuer: "Great Learning Academy",
      recipient: "Viisnu Anand S",
      date: "September 2024",
      type: "Course",
      description: "Completed a free online course on Frequency Distribution.",
      icon: GraduationCap,
    },
    {
      title: "AWS Foundations: Machine Learning Basics",
      issuer: "AWS",
      recipient: "Viisnu Anand S",
      date: "January 01, 2025",
      type: "Course",
      description: "Completed foundational course on Machine Learning concepts using AWS services.",
      icon: GraduationCap,
    },
    {
      title: "C Programming for Embedded Applications",
      issuer: "LinkedIn Learning",
      recipient: "Viisnu Anand S",
      date: "May 30, 2025",
      type: "Course",
      description: "Completed course focused on programming embedded systems in C.",
      metadata: "2h 5m",
      icon: BookOpen,
    },
    {
      title: "Introduction to Battery-Management Systems",
      issuer: "University of Colorado Boulder (Coursera)",
      recipient: "Viisnu Anand S",
      date: "October 08, 2025",
      type: "Course",
      description: "Completed non-credit course on battery management systems via Coursera.",
      icon: GraduationCap,
    },
    {
      title: "Internship — Pricol Limited",
      issuer: "Pricol Limited",
      recipient: "Viisnu Anand S",
      date: "June 16 – June 30, 2025",
      type: "Internship",
      description: "Completed internship at Pricol Limited, Corporate – Manufacturing Engineering department.",
      metadata: "Performance: Good",
      icon: Building2,
    },
    {
      title: "Introduction to Internet of Things (IoT)",
      issuer: "NPTEL",
      recipient: "Viisnu Anand S",
      date: "July – October 2024",
      type: "Course",
      description: "Completed 12-week NPTEL course on Introduction to IoT.",
      metadata: "Score: 73",
      icon: GraduationCap,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="certificates"
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-certificates">
            Certificates & Achievements
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <Card
                  key={index}
                  className={`hover-elevate active-elevate-2 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${index * 75}ms`,
                  }}
                  data-testid={`card-certificate-${index}`}
                >
                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-2 bg-primary/10 rounded-md shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {cert.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight text-primary">
                      {cert.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground">Recipient: {cert.recipient}</p>
                      <p className="text-xs text-muted-foreground">{cert.date}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                    {cert.metadata && (
                      <Badge variant="outline" className="text-xs">
                        {cert.metadata}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
