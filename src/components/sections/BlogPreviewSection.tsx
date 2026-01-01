import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  slug: string;
  published_at: string | null;
  created_at: string;
}

const fallbackPosts: BlogPost[] = [
  {
    id: "1",
    title: "2024 Interior Design Trends: What's In and What's Out",
    excerpt: "Discover the latest trends shaping interior design this year, from sustainable materials to bold color choices.",
    cover_image: null,
    slug: "2024-interior-design-trends",
    published_at: null,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "The Art of Mixing Textures in Your Home",
    excerpt: "Learn how to layer different textures to create depth and visual interest in any room.",
    cover_image: null,
    slug: "mixing-textures-home",
    published_at: null,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Creating a Functional Home Office Space",
    excerpt: "Tips and tricks for designing a productive and stylish workspace in your home.",
    cover_image: null,
    slug: "functional-home-office",
    published_at: null,
    created_at: new Date().toISOString()
  }
];

export function BlogPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, excerpt, cover_image, slug, published_at, created_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (data && data.length > 0) {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="text-primary text-sm tracking-widest uppercase font-medium">
              From Our Blog
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
              Design <span className="text-gradient-gold">Insights</span>
            </h2>
          </div>
          <Button variant="goldOutline" className="mt-6 md:mt-0" asChild>
            <Link to="/blog">
              View All Posts
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                {/* Image */}
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-secondary mb-6">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                      <span className="text-6xl font-display text-muted-foreground/20">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar size={14} />
                  <time>
                    {format(new Date(post.published_at || post.created_at), 'MMM dd, yyyy')}
                  </time>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
