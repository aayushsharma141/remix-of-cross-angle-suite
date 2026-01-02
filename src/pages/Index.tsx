import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InteriorDesignBusiness",
    "name": "Crossangle Interior",
    "description": "Premier interior design studio in Jamshedpur & Kolkata. Transforming spaces into luxury living experiences.",
    "url": "https://crossangleinterior.com",
    "logo": `${window.location.origin}/logo.png`,
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Jamshedpur",
        "addressRegion": "Jharkhand",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "Kolkata",
        "addressRegion": "West Bengal",
        "addressCountry": "IN"
      }
    ],
    "telephone": "+91-7909041132",
    "email": "hello@crossangleinterior.com",
    "priceRange": "$$",
    "openingHours": "Mo-Sa 09:00-19:00",
    "sameAs": [
      "https://instagram.com/crossangleinterior",
      "https://facebook.com/crossangleinterior",
      "https://youtube.com/@crossangleinterior"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Crossangle Interior | Premier Interior Design Studio</title>
        <meta name="description" content="Transform your space into luxury with Crossangle Interior. Award-winning interior design studio in Jamshedpur & Kolkata. 500+ happy clients. Free consultation." />
        <meta name="keywords" content="interior design, luxury interior, residential design, commercial design, Jamshedpur, Kolkata, home design, office design" />
        <meta property="og:title" content="Crossangle Interior | Elevate Your Space Into Luxury" />
        <meta property="og:description" content="Premier interior design studio transforming spaces into luxury living experiences. 15+ years experience, 500+ happy clients." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://crossangleinterior.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crossangle Interior | Premier Interior Design" />
        <meta name="twitter:description" content="Transform your space into luxury. Award-winning interior design in Jamshedpur & Kolkata." />
        <link rel="canonical" href="https://crossangleinterior.com" />
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
          <ProcessSection />
          <PortfolioSection />
          <TrustSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
