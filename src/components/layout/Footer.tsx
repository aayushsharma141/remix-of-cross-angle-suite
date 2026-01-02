import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/crossangleinterior", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/crossangleinterior", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com/@crossangleinterior", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/crossangleinterior", label: "LinkedIn" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

const services = [
  "Residential Design",
  "Commercial Spaces",
  "Color Consultation",
  "Lighting Design",
  "Furniture Selection",
  "Space Planning",
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <div>
                <span className="font-display text-xl font-bold text-primary">
                  Crossangle
                </span>
                <span className="font-display text-xl font-light text-foreground ml-1">
                  Interior
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transforming spaces into extraordinary experiences. Award-winning 
              interior design studio in Jamshedpur & Kolkata.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-foreground">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    to="/#services"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  <p>Jamshedpur, Jharkhand</p>
                  <p>Kolkata, West Bengal</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a
                  href="tel:+917909041132"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  +91 7909041132
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a
                  href="mailto:hello@crossangleinterior.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  hello@crossangleinterior.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle size={18} className="text-primary flex-shrink-0" />
                <a
                  href="https://wa.me/917909041132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  WhatsApp 24/7
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Crossangle Interior. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917909041132?text=Hi!%20I'm%20interested%20in%20your%20interior%20design%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg z-40 transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </footer>
  );
}
