import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Sparkles, Target } from "lucide-react";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  content?: string;
}

const features = [
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized globally for innovative and timeless design solutions"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled designers, architects, and craftsmen working together"
  },
  {
    icon: Sparkles,
    title: "Bespoke Design",
    description: "Every project is uniquely tailored to your vision and lifestyle"
  },
  {
    icon: Target,
    title: "Detail Oriented",
    description: "Meticulous attention to every element, from concept to completion"
  }
];

export function AboutSection({
  title = "About Cross Angle Interior",
  subtitle = "Two Decades of Design Excellence",
  content = "Founded in 2005, Cross Angle Interior has established itself as a premier interior design firm. We specialize in creating bespoke residential and commercial spaces that reflect our clients' unique personalities and aspirations. Our philosophy centers on the perfect intersection of aesthetics and functionality."
}: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-card relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm tracking-widest uppercase font-medium">
              About Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              {title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-gradient-gold">{title.split(' ').slice(-1)}</span>
            </h2>
            <p className="text-lg text-primary/80 font-medium mb-4">
              {subtitle}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {content}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team of passionate designers brings together diverse expertise in 
              architecture, art, and sustainable design. We believe that great spaces 
              don't just look beautiful—they enhance the way you live and work.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
