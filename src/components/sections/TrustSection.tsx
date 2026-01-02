import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Shield, Wrench, BadgeCheck, HeartHandshake } from "lucide-react";

const trustFeatures = [
  {
    icon: Award,
    title: "Award-Winning Designs",
    description: "Recognized for excellence in interior design across Jharkhand"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "15+ certified designers and skilled craftsmen"
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "100% client satisfaction with money-back guarantee"
  },
  {
    icon: Wrench,
    title: "Premium Tools & Materials",
    description: "Partnered with top brands for superior quality"
  },
  {
    icon: BadgeCheck,
    title: "Authentic Materials",
    description: "Direct sourcing from verified manufacturers"
  },
  {
    icon: HeartHandshake,
    title: "Post-Project Support",
    description: "1 year free maintenance and support"
  }
];

const brandPartners = [
  { name: "Asian Paints", subtitle: "Color Partner", letter: "A" },
  { name: "Hafele", subtitle: "Hardware Expert", letter: "H" },
  { name: "Godrej", subtitle: "Security Partner", letter: "G" },
  { name: "Philips", subtitle: "Lighting Partner", letter: "P" },
  { name: "Hettich", subtitle: "Fittings Partner", letter: "H" },
  { name: "Jaquar", subtitle: "Bath Solutions", letter: "J" }
];

export function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-medium">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Trust & <span className="text-primary">Credibility</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We're committed to delivering excellence in every project
          </p>
        </motion.div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <span className="text-muted-foreground text-sm tracking-widest uppercase mb-8 block">
            Trusted Brand Partners
          </span>
          
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll gap-8">
              {[...brandPartners, ...brandPartners].map((partner, index) => (
                <div 
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{partner.letter}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{partner.name}</p>
                    <p className="text-xs text-muted-foreground">{partner.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
