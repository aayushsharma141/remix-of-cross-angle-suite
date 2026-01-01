import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  video_url: string | null;
}

// Fallback portfolio items when no database entries
const fallbackPortfolio: PortfolioItem[] = [
  {
    id: "1",
    title: "Modern Penthouse",
    description: "A contemporary penthouse with panoramic city views",
    category: "residential",
    image_url: null,
    video_url: null
  },
  {
    id: "2",
    title: "Luxury Boutique Hotel",
    description: "Elegant hospitality design with local influences",
    category: "commercial",
    image_url: null,
    video_url: null
  },
  {
    id: "3",
    title: "Minimalist Villa",
    description: "Clean lines and natural materials in harmony",
    category: "residential",
    image_url: null,
    video_url: null
  },
  {
    id: "4",
    title: "Executive Office Suite",
    description: "Professional workspace designed for productivity",
    category: "commercial",
    image_url: null,
    video_url: null
  },
  {
    id: "5",
    title: "Coastal Retreat",
    description: "Beachfront living with organic textures",
    category: "residential",
    image_url: null,
    video_url: null
  },
  {
    id: "6",
    title: "Art Gallery Space",
    description: "A curated environment for contemporary art",
    category: "commercial",
    image_url: null,
    video_url: null
  }
];

const categories = ["all", "residential", "commercial"];

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");
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

  const filteredItems = activeCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

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
            Featured <span className="text-gradient-gold">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our collection of award-winning interior design projects
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
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
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <span className="text-4xl font-display text-muted-foreground/20">
                    {item.title.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-primary text-xs tracking-widest uppercase mb-2">
                  {item.category}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {item.description}
                </p>
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="goldOutline" size="lg" asChild>
            <Link to="/portfolio">
              View All Projects
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
