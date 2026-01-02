import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Building2, Palette, Lightbulb, Armchair, LayoutGrid, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    number: "01",
    icon: Home,
    title: "Residential Design",
    description: "Create your dream home with our full-service residential interior design, from concept to completion.",
    badge: "Popular"
  },
  {
    number: "02",
    icon: Building2,
    title: "Commercial Spaces",
    description: "Transform your business environment into an inspiring workspace that boosts productivity.",
    badge: "Premium"
  },
  {
    number: "03",
    icon: Palette,
    title: "Color Consultation",
    description: "Expert color analysis and palette creation to perfectly set the mood and style of your space.",
    badge: null
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Custom lighting solutions that enhance ambiance, functionality, and architectural features.",
    badge: "Popular"
  },
  {
    number: "05",
    icon: Armchair,
    title: "Furniture Selection",
    description: "Curated furniture sourcing from premium brands and custom pieces tailored to your space.",
    badge: "Premium"
  },
  {
    number: "06",
    icon: LayoutGrid,
    title: "Space Planning",
    description: "Optimize your floor plan for flow, functionality, and aesthetic balance throughout your space.",
    badge: null
  }
];

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  content?: string;
}

export function ServicesSection({
  title = "Our Design Services",
  subtitle = "What We Offer",
  content = "From concept to completion, we offer comprehensive interior design services tailored to bring your vision to life."
}: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-card relative" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-medium">
            {subtitle}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {content}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-gold">
                {/* Badge */}
                {service.badge && (
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                    service.badge === "Premium" 
                      ? "bg-primary/20 text-primary" 
                      : "bg-secondary text-foreground"
                  }`}>
                    {service.badge}
                  </span>
                )}

                {/* Number */}
                <span className="text-4xl font-display font-bold text-muted/30 mb-4 block">
                  {service.number}
                </span>

                <h3 className="font-display text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                <Link 
                  to="/#contact" 
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="goldOutline" size="lg" asChild>
            <Link to="/#contact">
              View All Services
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
