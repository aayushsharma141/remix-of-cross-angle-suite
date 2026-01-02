import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Ruler, Palette, Hammer, Home } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Consult",
    duration: "1-2 days",
    description: "Share your vision with our expert designers",
    details: [
      "Understanding your lifestyle & space usage",
      "Budget & timeline alignment discussion",
      "On-site or virtual meeting options",
      "Initial concept sketches shared"
    ]
  },
  {
    icon: Ruler,
    title: "Measure & Plan",
    duration: "3-5 days",
    description: "Precise measurements and detailed planning",
    details: [
      "Professional site survey & measurements",
      "Structural assessment & feasibility",
      "Space optimization strategies",
      "Material selection guidance"
    ]
  },
  {
    icon: Palette,
    title: "Design Approval",
    duration: "7-10 days",
    description: "Review realistic 3D visualizations before execution",
    details: [
      "Photorealistic 3D renders of your space",
      "Multiple design options to choose from",
      "Material & finish samples provided",
      "Revisions until you're satisfied"
    ]
  },
  {
    icon: Hammer,
    title: "Execute",
    duration: "30-45 days",
    description: "Expert craftsmen bring your design to life",
    details: [
      "Skilled craftsmen & quality materials",
      "Regular progress updates & site visits",
      "Strict quality control checkpoints",
      "Timeline adherence & milestone reviews"
    ]
  },
  {
    icon: Home,
    title: "Handover",
    duration: "1 day",
    description: "Walk through your transformed space",
    details: [
      "Complete walkthrough of finished space",
      "Quality assurance inspection",
      "Warranty documentation provided",
      "Post-project support available"
    ]
  }
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 md:py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase font-medium">
            How We Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Our Design <span className="text-primary">Process</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to completion, we guide you through every step
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Icon */}
                <div className="relative z-10 mx-auto lg:mx-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <h4 className="font-display text-lg font-semibold text-foreground">
                      {step.title}
                    </h4>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground mb-3">
                    {step.duration}
                  </span>
                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
