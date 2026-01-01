import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InteriorDesignBusiness",
    "name": "Cross Angle Interior",
    "description": "Award-winning interior design firm specializing in luxury residential and commercial spaces",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Design Avenue, Suite 500",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "telephone": "+1-234-567-890",
    "email": "hello@crossangle.com",
    "priceRange": "$$$",
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": [
      "https://instagram.com/crossangleinterior",
      "https://facebook.com/crossangleinterior",
      "https://linkedin.com/company/crossangleinterior"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Cross Angle Interior | Luxury Interior Design</title>
        <meta name="description" content="Transform your space with Cross Angle Interior. Award-winning luxury interior design for residential and commercial projects. 20+ years of excellence." />
        <meta name="keywords" content="interior design, luxury design, residential design, commercial design, interior decorator, home design, office design" />
        <meta property="og:title" content="Cross Angle Interior | Luxury Interior Design" />
        <meta property="og:description" content="Transform your space with Cross Angle Interior. Award-winning luxury interior design for residential and commercial projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cross Angle Interior | Luxury Interior Design" />
        <meta name="twitter:description" content="Transform your space with Cross Angle Interior. Award-winning luxury interior design." />
        <link rel="canonical" href={window.location.origin} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <BlogPreviewSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;