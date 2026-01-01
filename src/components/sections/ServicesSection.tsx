import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Building2, Palette, Ruler, Wrench, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Transform your home into a personalized sanctuary. From full renovations to room makeovers, we create living spaces that inspire."
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description: "Elevate your business environment with designs that boost productivity and impress clients. Offices, retail, and hospitality."
  },
  {
    icon: Palette,
    title: "Interior Styling",
    description: "Expert curation of furniture, art, and accessories. We source unique pieces that bring personality and cohesion to any space."
  },
  {
    icon: Ruler,
    title: "Space Planning",
    description: "Optimize your floor plan for flow and functionality. Strategic layouts that maximize space while maintaining aesthetic appeal."
  },
  {
    icon: Wrench,
    title: "Renovation & Remodeling",
    description: "Complete project management from concept to completion. We handle contractors, timelines, and budgets seamlessly."
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Create atmosphere and ambiance with professional lighting design. From natural light optimization to dramatic accent lighting."
  }
];

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  content?: string;
}

export function ServicesSection({
  title = "Our Services",
  subtitle = "Comprehensive Design Solutions",
  content = "From concept to completion, we offer a full spectrum of interior design services tailored to your needs."
}: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-background relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-medium">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {content}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-gold">
                <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
