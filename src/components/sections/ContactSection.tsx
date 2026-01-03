import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validateContactForm } from "@/lib/validation";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Jamshedpur, Jharkhand", "Kolkata, West Bengal"]
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 7909041132"]
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@crossangleinterior.com"]
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 9AM - 7PM", "WhatsApp Available 24/7"]
  }
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    category: "other" as "residential" | "commercial" | "other"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    // Validate form data
    const validation = validateContactForm(formData);
    
    if (!validation.success) {
      const errors = 'errors' in validation ? validation.errors : {};
      setFormErrors(errors);
      toast({
        title: "Please fix the errors",
        description: "Some fields have invalid values.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: validatedData } = validation;
      const fullName = `${validatedData.firstName} ${validatedData.lastName}`.trim();
      
      const { error: insertError } = await supabase
        .from('leads')
        .insert({
          name: fullName,
          email: validatedData.email,
          phone: validatedData.phone || null,
          message: validatedData.message,
          category: validatedData.category,
          source: 'website'
        });

      if (insertError) throw insertError;

      try {
        await supabase.functions.invoke('process-lead', {
          body: { 
            name: fullName, 
            email: validatedData.email,
            phone: validatedData.phone,
            message: validatedData.message,
            category: validatedData.category
          }
        });
      } catch (aiError) {
        console.log('AI processing skipped:', aiError);
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        category: "other"
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-card relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-medium">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Ready to Transform <span className="text-primary">Your Space?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Get a free consultation and 3D design visualization.
            <br />
            <span className="text-foreground">No obligation. No hidden costs.</span>
          </p>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button variant="goldOutline" size="lg" asChild>
            <a href="tel:+917909041132">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
          </Button>
          <Button variant="hero" size="lg" asChild>
            <a 
              href="https://wa.me/917909041132?text=Hi!%20I'm%20interested%20in%20your%20interior%20design%20services."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Us
            </a>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {info.title}
                  </h4>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl bg-background border border-border">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      maxLength={50}
                      className={formErrors.firstName ? "border-destructive" : ""}
                      required
                    />
                    {formErrors.firstName && (
                      <p className="text-destructive text-xs">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      maxLength={50}
                      className={formErrors.lastName ? "border-destructive" : ""}
                      required
                    />
                    {formErrors.lastName && (
                      <p className="text-destructive text-xs">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    maxLength={255}
                    className={formErrors.email ? "border-destructive" : ""}
                    required
                  />
                  {formErrors.email && (
                    <p className="text-destructive text-xs">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    maxLength={20}
                    className={formErrors.phone ? "border-destructive" : ""}
                  />
                  {formErrors.phone && (
                    <p className="text-destructive text-xs">{formErrors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell Us About Your Project</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your vision..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    maxLength={5000}
                    className={formErrors.message ? "border-destructive" : ""}
                    required
                  />
                  {formErrors.message && (
                    <p className="text-destructive text-xs">{formErrors.message}</p>
                  )}
                </div>

                <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
