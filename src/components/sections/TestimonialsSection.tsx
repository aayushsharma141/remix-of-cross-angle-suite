import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Homeowner",
    location: "3BHK Apartment, Jamshedpur",
    content: "Crossangle Interior transformed our home beyond our expectations. Their attention to detail and creative vision made our space truly luxurious.",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    location: "Corporate Office, Kolkata",
    content: "The team delivered an exceptional office design that perfectly reflects our brand identity. Professional, timely, and incredibly talented.",
    rating: 5
  },
  {
    name: "Anita Desai",
    role: "Apartment Owner",
    location: "2BHK, Jamshedpur",
    content: "From concept to completion, the entire experience was seamless. They understood our vision and executed it flawlessly.",
    rating: 5
  },
  {
    name: "Vikram Singh",
    role: "Restaurant Owner",
    location: "Fine Dining, Ranchi",
    content: "Our restaurant's new interior has received countless compliments. Crossangle truly understands commercial spaces.",
    rating: 5
  }
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 md:py-32 bg-card relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-medium">
            Client Reviews
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            What Our Clients <span className="text-primary">Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real experiences from homeowners and businesses who trusted us with their spaces
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative p-8 md:p-12 rounded-3xl bg-background border border-border">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-display italic">
                "{testimonials[activeIndex].content}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {testimonials[activeIndex].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[activeIndex].role}
                    </p>
                    <p className="text-xs text-primary">
                      {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Google Review Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a 
            href="https://g.page/crossangle-interior/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background border border-border hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-foreground">G</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-primary fill-current" />
              ))}
            </div>
            <div className="text-left">
              <span className="font-semibold text-foreground">4.8/5.0</span>
              <span className="text-xs text-muted-foreground block">Based on 50+ reviews</span>
            </div>
          </a>
        </motion.div>

        {/* Testimonial Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                index === activeIndex 
                  ? "bg-primary/10 border-primary" 
                  : "bg-background border-border hover:border-primary/30"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
