import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import portfolioBedroom from "@/assets/portfolio-bedroom.jpg";
import portfolioKitchen from "@/assets/portfolio-kitchen.jpg";
import portfolioOffice from "@/assets/portfolio-office.jpg";

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  video_url: string | null;
}

// Fallback portfolio items with actual images
const fallbackPortfolio: PortfolioItem[] = [
  {
    id: "1",
    title: "Serene Master Suite",
    description: "The clients wanted a serene, calming bedroom retreat that promotes relaxation and restful sleep.",
    category: "residential",
    image_url: portfolioBedroom,
    video_url: null
  },
  {
    id: "2",
    title: "Modern Culinary Space",
    description: "A complete kitchen renovation with focus on functionality, storage optimization, and a clean aesthetic.",
    category: "residential",
    image_url: portfolioKitchen,
    video_url: null
  },
  {
    id: "3",
    title: "Executive Workspace",
    description: "Design a professional office environment that promotes creativity, productivity, and reflects the brand.",
    category: "commercial",
    image_url: portfolioOffice,
    video_url: null
  }
];

const categories = ["All", "Residential", "Commercial"];

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(fallbackPortfolio);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('display_order', { ascending: true })
        .limit(6);
      
      if (data && data.length > 0) {
        setPortfolioItems(data);
      }
    };
    fetchPortfolio();
  }, []);

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-card relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-medium">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our portfolio of stunning interior transformations that showcase our 
            commitment to excellence and attention to detail.
          </p>
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <Link to="/#portfolio" className="text-primary hover:underline text-sm">
            View All Projects →
          </Link>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary"
            >
              <img
                src={item.image_url || portfolioBedroom}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Year Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
                2024
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-xs font-medium text-primary-foreground capitalize">
                {item.category}
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-primary text-xs tracking-widest uppercase mb-2 capitalize">
                  {item.category}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {item.description}
                </p>
                <Link 
                  to="/#portfolio" 
                  className="inline-flex items-center text-primary text-sm hover:underline"
                >
                  View Full Project
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Video indicator */}
              {item.video_url && (
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play size={16} className="text-primary-foreground ml-0.5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 p-8 rounded-2xl bg-background border border-border"
        >
          <p className="text-muted-foreground mb-4">Want to see more of our work?</p>
          <Button variant="goldOutline" size="lg" asChild>
            <Link to="/#portfolio">
              Explore Full Portfolio
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
