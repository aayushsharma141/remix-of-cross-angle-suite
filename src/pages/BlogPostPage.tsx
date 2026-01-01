import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, User, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  cover_image: string | null;
  slug: string;
  published_at: string | null;
  created_at: string;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (data) {
        setPost(data);
      } else if (!error) {
        navigate('/blog', { replace: true });
      }
      setIsLoading(false);
    };

    fetchPost();
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-8 w-48 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-64 mb-8" />
            <Skeleton className="aspect-[16/9] w-full mb-8 rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const publishedDate = post.published_at || post.created_at;
  const readingTime = Math.ceil((post.content?.split(' ').length || 0) / 200);

  return (
    <>
      <Helmet>
        <title>{post.title} | Cross Angle Interior Blog</title>
        <meta name="description" content={post.excerpt || `Read ${post.title} on Cross Angle Interior blog.`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ''} />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.cover_image,
            "datePublished": publishedDate,
            "author": {
              "@type": "Organization",
              "name": "Cross Angle Interior"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Cross Angle Interior"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-32 pb-24">
          <article className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/blog">
                <Button variant="ghost" className="mb-8 -ml-2">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </motion.div>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <time dateTime={publishedDate}>
                    {format(new Date(publishedDate), 'MMMM dd, yyyy')}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>Cross Angle Interior</span>
                </div>
              </div>
            </motion.header>

            {/* Cover Image */}
            {post.cover_image && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-12"
              >
                <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 italic">
                  {post.excerpt}
                </p>
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {post.content?.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 p-8 rounded-2xl bg-secondary/50 text-center"
            >
              <h3 className="font-display text-2xl font-bold mb-4">
                Ready to Transform Your Space?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss how we can bring your interior design vision to life.
              </p>
              <Link to="/#contact">
                <Button variant="gold" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
