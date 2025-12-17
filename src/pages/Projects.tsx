import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

const Projects = () => {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <span className="font-terminal text-muted-foreground text-sm">
              CLASSIFIED_FILES
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
          
          <h1 className="font-cyber text-4xl md:text-5xl text-primary neon-text text-center mb-4">
            PROJECT_ARCHIVE
          </h1>
          
          <p className="font-terminal text-center text-muted-foreground text-lg max-w-2xl mx-auto">
            {">"} Accessing secure project files... {projects.length} records found.
          </p>
        </motion.div>

        {/* Filter bar (visual only for now) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center justify-center gap-4 flex-wrap"
        >
          {["ALL", "C/C++", "Python", "Web"].map((filter, index) => (
            <button
              key={filter}
              className={`font-terminal px-4 py-2 border transition-all duration-300 ${
                index === 0
                  ? "border-secondary text-secondary bg-secondary/10"
                  : "border-primary/30 text-primary/70 hover:border-primary hover:text-primary"
              }`}
            >
              [{filter}]
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Empty state indicator */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-terminal text-muted-foreground text-xl">
              {">"} NO_FILES_FOUND
            </p>
            <p className="font-terminal text-primary/50 mt-2">
              Check back later for updates...
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Projects;
