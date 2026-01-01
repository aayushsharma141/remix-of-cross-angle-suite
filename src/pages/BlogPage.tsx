import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
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
    title: "2024 Interior Design Trends",
    excerpt: "Discover the latest trends shaping interior design this year.",
    cover_image: null,
    slug: "2024-interior-design-trends",
    published_at: null,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "The Art of Mixing Textures",
    excerpt: "Learn how to layer different textures to create depth.",
    cover_image: null,
    slug: "mixing-textures",
    published_at: null,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Creating a Home Office",
    excerpt: "Tips for designing a productive and stylish workspace.",
    cover_image: null,
    slug: "home-office",
    published_at: null,
    created_at: new Date().toISOString()
  }
];

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, excerpt, cover_image, slug, published_at, created_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (data && data.length > 0) {
        setPosts(data);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Blog | Cross Angle Interior</title>
        <meta name="description" content="Read our latest insights on interior design trends, tips, and inspiration from Cross Angle Interior." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-primary text-sm tracking-widest uppercase font-medium">
                Our Blog
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
                Design <span className="text-gradient-gold">Insights</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Explore our latest articles on interior design, trends, and inspiration
              </p>
              
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
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

                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar size={14} />
                      <time>
                        {format(new Date(post.published_at || post.created_at), 'MMM dd, yyyy')}
                      </time>
                    </div>
                    <h2 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Read More <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No articles found matching your search.</p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;