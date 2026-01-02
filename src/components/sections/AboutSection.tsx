import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Award, Users, Clock, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  content?: string;
}

const features = [
  "Personalized Design Approach",
  "Premium Material Selection",
  "On-Time Project Delivery",
  "Post-Completion Support",
];

export function AboutSection({
  title = "Creating Spaces That Inspire",
  subtitle = "About Us",
  content = "Welcome to Crossangle Interior, a premier interior design studio where creativity meets craftsmanship. Our team of passionate designers brings together diverse expertise in residential, commercial, and hospitality design."
}: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden" ref={ref}>
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
              {subtitle}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              {title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-primary">{title.split(' ').slice(-1)}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {content}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We believe that great design is about more than aesthetics—it's about creating 
              environments that enhance how you live, work, and feel.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button variant="goldOutline" asChild>
              <Link to="/#services">Learn More About Us</Link>
            </Button>
          </motion.div>

          {/* Award Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Award-Winning Design
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Recognized for excellence in interior design across Jharkhand and Kolkata
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-xl bg-background">
                  <span className="text-3xl font-display font-bold text-primary">25+</span>
                  <p className="text-sm text-muted-foreground mt-1">Awards Won</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-background">
                  <span className="text-3xl font-display font-bold text-primary">Certified</span>
                  <p className="text-sm text-muted-foreground mt-1">Design Experts</p>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-primary text-primary-foreground shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8" />
                <div>
                  <span className="text-2xl font-bold">15+</span>
                  <p className="text-xs opacity-80">Expert Designers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-6 -right-6 p-4 rounded-xl bg-card border border-border shadow-lg"
            >
              <div className="flex items-center gap-3">
                <HeartHandshake className="w-8 h-8 text-primary" />
                <div>
                  <span className="text-2xl font-bold text-foreground">100%</span>
                  <p className="text-xs text-muted-foreground">Client Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
