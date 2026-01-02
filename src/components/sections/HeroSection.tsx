import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-interior.jpg";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
}

export function HeroSection({ 
  title = "Elevate Your Space Into Luxury",
  subtitle = "Premier Interior Design Studio",
  content = "Transforming your vision into exquisite living spaces with innovative and personalized interior design solutions.",
  imageUrl
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={imageUrl || heroImage} 
          alt="Luxurious modern living room interior design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium tracking-wide uppercase">
              {subtitle}
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-foreground">Elevate Your Space</span>
            <br />
            <span className="text-primary">Into Luxury</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            {content}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-12"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/#contact">
                Start Your Project
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/#portfolio">
                <Play size={18} className="mr-2" />
                Watch Showreel
              </Link>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center"
                >
                  <Star className="w-4 h-4 text-primary" fill="currentColor" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-primary border-2 border-background flex items-center justify-center text-primary-foreground text-xs font-bold">
                99+
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground">500+ Happy Clients</p>
              <p className="text-sm text-muted-foreground">Trusted by luxury homeowners worldwide</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase mb-2 block">
          Discover More
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 mx-auto"
        >
          <motion.div
            animate={{ height: ["20%", "50%", "20%"] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-border"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "500+", label: "Happy Clients" },
              { value: "1000+", label: "Projects Completed" },
              { value: "25+", label: "Design Awards" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
