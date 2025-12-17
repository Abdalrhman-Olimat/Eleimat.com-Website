import { motion } from "framer-motion";
import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  // Filter projects based on selected category
  const filteredProjects = selectedFilter === "ALL" 
    ? projects 
    : projects.filter(project => 
        project.techStack.some(tech => 
          selectedFilter === "C/C++" ? (tech === "C" || tech === "C++") :
          selectedFilter === "Graphics/Games" ? (tech === "OpenGL" || tech === "MiniLibX" || tech === "raylib") :
          tech.includes(selectedFilter) || tech === selectedFilter
        )
      );

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
            {">"} Accessing secure project files... {filteredProjects.length} records found.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center justify-center gap-4 flex-wrap"
        >
          {["ALL", "C/C++", "Python", "Web", "Linux", "Graphics/Games"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`font-terminal px-4 py-2 border transition-all duration-300 ${
                selectedFilter === filter
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
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Empty state indicator */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-terminal text-muted-foreground text-xl">
              {">"} NO_FILES_FOUND
            </p>
            <p className="font-terminal text-primary/50 mt-2">
              No projects match the selected filter...
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Projects;
