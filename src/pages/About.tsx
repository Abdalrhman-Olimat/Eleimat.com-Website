import { motion } from "framer-motion";
import { Code, Server, Shield, Zap } from "lucide-react";

const aboutSections = [
  {
    icon: Code,
    title: "DEVELOPMENT",
    description:
      "Full-stack development with a focus on clean, maintainable code. Proficient in modern web technologies and system programming.",
  },
  {
    icon: Server,
    title: "INFRASTRUCTURE",
    description:
      "Experience with cloud platforms (AWS), containerization (Docker), and DevOps practices for scalable deployments.",
  },
  {
    icon: Shield,
    title: "SECURITY",
    description:
      "Understanding of secure coding practices, authentication systems, and vulnerability assessment.",
  },
  {
    icon: Zap,
    title: "PERFORMANCE",
    description:
      "Optimization of algorithms and systems for maximum efficiency. Low-level programming expertise in C/C++.",
  },
];

const About = () => {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-cyber text-4xl md:text-5xl text-primary neon-text mb-4">
            ABOUT_ME
          </h1>
          <p className="font-terminal text-muted-foreground text-lg">
            {">"} Loading personal data...
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-2 border-primary/30 p-6 md:p-8 mb-12 relative"
        >
          <div className="absolute -top-3 left-6 bg-background px-3">
            <span className="font-terminal text-xs text-secondary">
              [PROFILE]
            </span>
          </div>

          <div className="space-y-4 font-terminal text-lg text-foreground/80">
            <p>
              <span className="text-primary">{">"}</span> Software Engineer
              based in Jordan with a passion for building elegant solutions to
              complex problems.
            </p>
            <p>
              <span className="text-primary">{">"}</span> Co-founder of
              DeepDiveNerds, where we explore the depths of technology and share
              knowledge with the community.
            </p>
            <p>
              <span className="text-primary">{">"}</span> Currently focused on
              full-stack development, cloud architecture, and system
              programming.
            </p>
          </div>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="font-cyber text-2xl text-primary mb-6 text-center">
            EXPERTISE_MODULES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="border border-primary/30 p-6 hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <section.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                  <h3 className="font-cyber text-lg text-primary group-hover:text-secondary transition-colors">
                    {section.title}
                  </h3>
                </div>
                <p className="font-terminal text-muted-foreground text-sm">
                  {section.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline/Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-cyber text-2xl text-primary mb-6 text-center">
            JOURNEY_LOG
          </h2>
          <div className="space-y-4">
            {[
              {
                year: "2024",
                event: "Co-founded DeepDiveNerds",
                status: "ACTIVE",
              },
              {
                year: "2023",
                event: "Completed 42 Network curriculum",
                status: "COMPLETE",
              },
              {
                year: "2022",
                event: "Started full-stack development journey",
                status: "COMPLETE",
              },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-4 font-terminal"
              >
                <span className="text-secondary w-16">[{item.year}]</span>
                <div className="h-px flex-1 bg-primary/20" />
                <span className="text-foreground/80 flex-1">{item.event}</span>
                <span
                  className={`text-xs px-2 py-1 border ${
                    item.status === "ACTIVE"
                      ? "border-secondary text-secondary"
                      : "border-primary/30 text-primary/50"
                  }`}
                >
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default About;
