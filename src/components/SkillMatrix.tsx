import { motion } from "framer-motion";
import { useState } from "react";
import { Download } from "lucide-react";

const skills = [
  { name: "C/C++", level: 95, status: "LOADED" },
  { name: "Python", level: 80, status: "LOADED" },
  { name: "Java", level: 75, status: "LOADED" },
  { name: "AWS", level: 85, status: "LOADED" },
  { name: "Docker", level: 60, status: "LOADED" },
  { name: "Linux", level: 92, status: "LOADED" },
  // { name: "React", level: 87, status: "LOADED" },
  // { name: "Node.js", level: 84, status: "LOADED" },
];

export const SkillMatrix = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-cyber text-3xl md:text-4xl text-primary neon-text mb-2">
            SKILL_MATRIX
          </h2>
          <p className="font-terminal text-muted-foreground text-lg">
            {">"} Loading system modules...
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                className={`border p-4 transition-all duration-300 ${
                  hoveredSkill === skill.name
                    ? "border-secondary neon-border-purple bg-secondary/5"
                    : "border-primary/30 bg-card/50"
                }`}
              >
                {/* Skill Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-terminal text-lg text-primary">
                    {skill.name}
                  </span>
                  <span
                    className={`font-terminal text-sm ${
                      hoveredSkill === skill.name
                        ? "text-secondary"
                        : "text-primary/70"
                    }`}
                  >
                    [{skill.status}]
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-muted rounded-sm overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      hoveredSkill === skill.name
                        ? "bg-secondary"
                        : "bg-primary"
                    }`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>

                {/* Percentage */}
                <div className="mt-2 flex justify-end">
                  <span className="font-terminal text-xs text-muted-foreground">
                    {skill.level}% EFFICIENCY
                  </span>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download CV Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <a
            href="/Abdalrahman E'lemit- CV.pdf"
            download="Abdalrahman_Eleimat_CV.pdf"
            className="group flex items-center gap-2 px-8 py-3 border-2 border-primary bg-primary/10 font-terminal text-xl text-primary hover:bg-primary hover:text-background transition-all duration-300 neon-border"
          >
            {">"} DOWNLOAD_CV
            <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
