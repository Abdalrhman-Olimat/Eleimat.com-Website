import { motion } from "framer-motion";
import { AnimatedGlitchText } from "@/components/GlitchText";
import { SkillMatrix } from "@/components/SkillMatrix";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail, Code, Server, Shield, Zap } from "lucide-react";

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

const Home = () => {
  return (
    <main className="min-h-screen pt-16 pb-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0.2,
              }}
              animate={{
                y: [null, -100],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pre-title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="font-terminal text-lg text-muted-foreground">
                {">"} IDENTITY_VERIFIED: TRUE
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-cyber text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wider px-2"
            >
              <AnimatedGlitchText
                text="ABDALRAHMAN"
                className="text-primary neon-text block"
              />
              <AnimatedGlitchText
                text="E'LEIMAT"
                className="text-secondary neon-text-purple block mt-2"
              />
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-8"
            >
              <p className="font-terminal text-xl md:text-2xl text-primary/80">
                Software Engineer | DevOps Engineer
              </p>
                <a 
                href="www.linkedin.com/company/deep-dive-nerds/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-terminal text-lg text-secondary mt-2 hover:text-primary transition-colors"
                >
                Co-Founder @ DeepDiveNerds
                </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link
                to="/projects"
                className="group flex items-center gap-2 px-8 py-3 border-2 border-primary bg-primary/10 font-terminal text-xl text-primary hover:bg-primary hover:text-background transition-all duration-300 neon-border"
              >
                {">"} VIEW_PROJECTS
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group flex items-center gap-2 px-8 py-3 border-2 border-secondary bg-secondary/10 font-terminal text-xl text-secondary hover:bg-secondary hover:text-background transition-all duration-300 neon-border-purple"
              >
                {">"} INIT_CONTACT
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center justify-center gap-6"
            >
              <a
                href="http://github.com/Abdalrhman-Olimat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors p-2 border border-primary/30 hover:border-secondary hover:neon-border-purple"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdalrahman-eleimat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors p-2 border border-primary/30 hover:border-secondary hover:neon-border-purple"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:abdalrahman@eleimat.com"
                className="text-primary hover:text-secondary transition-colors p-2 border border-primary/30 hover:border-secondary hover:neon-border-purple"
              >
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-24 "
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="font-terminal text-primary/50 text-sm flex items-center justify-center gap-2">
            <span>{">"}</span>
            <span>SCROLL_DOWN</span>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 border-t border-primary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-cyber text-4xl md:text-5xl text-primary neon-text mb-4">
              ABOUT_ME
            </h2>
            <p className="font-terminal text-muted-foreground text-lg">
              {">"} Loading personal data...
            </p>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                full-stack development, DevOps, cloud architecture, and system
                programming.
              </p>
            </div>
          </motion.div>

          {/* Expertise Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="font-cyber text-2xl text-primary mb-6 text-center">
              EXPERTISE_MODULES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="border border-primary/30 p-6 hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <section.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                    <h4 className="font-cyber text-lg text-primary group-hover:text-secondary transition-colors">
                      {section.title}
                    </h4>
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-cyber text-2xl text-primary mb-6 text-center">
              JOURNEY_LOG
            </h3>
            <div className="space-y-4">
              {[
                {
                  year: "2024",
                  event: "Co-founded DeepDiveNerds",
                  status: "ACTIVE",
                },
                {
                  year: "2025",
                  event: "Graduated from the Hashemite University with B.S in BIT",
                  status: "COMPLETE",
                },
                {
                  year: "2024",
                  event: "Core Curriculum Student @42Amman",
                  status: "ACTIVE",
                },
                {
                  year: "2022",
                  event: "Started full-stack development journey",
                  status: "ACTIVE",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
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
      </section>

      {/* Skills Section */}
      <SkillMatrix />

      {/* Quick Links Section */}
      <section className="py-20 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-cyber text-3xl text-primary neon-text mb-8">
              QUICK_ACCESS
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["PROJECTS", "CONTACT"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="font-terminal text-lg px-6 py-3 border border-primary/30 text-primary hover:border-secondary hover:text-secondary hover:neon-border-purple transition-all duration-300"
                >
                  {">"} {item}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
