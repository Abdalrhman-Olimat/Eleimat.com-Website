import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Project } from "@/data/projects";
import { ArrowRight, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { logTerminalAction } from "./FakeTerminal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative group"
      onMouseEnter={() => {
        setIsHovered(true);
        logTerminalAction("Hovering project:", project.title);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/projects/${project.id}`}
        onClick={() => logTerminalAction("Accessed project:", project.title)}
        className={`block relative border-2 p-6 transition-all duration-500 overflow-hidden cursor-pointer ${
          isHovered
            ? "border-secondary bg-secondary/5 neon-border-purple"
            : "border-primary/30 bg-card"
        }`}
      >
        {/* Scan line effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent"
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}

        {/* Header with lock icon */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            {isHovered ? (
              <Unlock className="w-5 h-5 text-secondary" />
            ) : (
              <Lock className="w-5 h-5 text-primary/50" />
            )}
            <span className="font-terminal text-xs text-muted-foreground">
              {isHovered ? "ACCESS GRANTED" : "CLASSIFIED"}
            </span>
          </div>
          <span className="font-terminal text-xs text-primary/50">
            #{String(index + 1).padStart(3, "0")}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-cyber text-2xl mb-2 transition-colors duration-300 ${
            isHovered ? "text-secondary neon-text-purple" : "text-primary"
          }`}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-terminal text-muted-foreground mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`font-terminal text-xs px-2 py-1 border transition-colors duration-300 ${
                isHovered
                  ? "border-secondary text-secondary"
                  : "border-primary/30 text-primary/70"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Access Button */}
        <div
          className={`inline-flex items-center gap-2 font-terminal text-lg transition-all duration-300 ${
            isHovered
              ? "text-secondary translate-x-2"
              : "text-primary opacity-0 group-hover:opacity-100"
          }`}
        >
          {">"} ACCESS_FILE
          <ArrowRight className="w-4 h-4" />
        </div>

        {/* Corner brackets */}
        <div
          className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300 ${
            isHovered ? "border-secondary" : "border-primary/30"
          }`}
        />
        <div
          className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors duration-300 ${
            isHovered ? "border-secondary" : "border-primary/30"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors duration-300 ${
            isHovered ? "border-secondary" : "border-primary/30"
          }`}
        />
        <div
          className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300 ${
            isHovered ? "border-secondary" : "border-primary/30"
          }`}
        />
      </Link>
    </motion.div>
  );
};
