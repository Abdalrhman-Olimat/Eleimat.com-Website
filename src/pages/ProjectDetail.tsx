import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectById } from "@/data/projects";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { logTerminalAction } from "@/components/FakeTerminal";
import { useEffect } from "react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;

  useEffect(() => {
    if (project) {
      logTerminalAction("Loaded file:", project.title);
    }
  }, [project]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-terminal text-primary hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {">"} BACK_TO_ARCHIVE
          </Link>
        </motion.div>

        {/* Document Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border-2 border-primary/50 bg-card p-6 mb-8 relative"
        >
          {/* Classification stamp */}
          <div className="absolute -top-3 left-6 bg-background px-3">
            <span className="font-terminal text-xs text-destructive">
              [CLASSIFIED]
            </span>
          </div>

          {/* Title */}
          <h1 className="font-cyber text-4xl md:text-5xl text-primary neon-text mb-4">
            {project.title}
          </h1>

          {/* Description */}
          <p className="font-terminal text-muted-foreground text-lg mb-6">
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-terminal text-sm px-3 py-1 border border-secondary text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-terminal text-primary hover:text-secondary border border-primary/30 hover:border-secondary px-4 py-2 transition-all duration-300"
              onClick={() => logTerminalAction("External link:", "GitHub")}
            >
              <Github className="w-4 h-4" />
              SOURCE_CODE
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
        </motion.div>

        {/* Content Blocks */}
        <div className="space-y-6">
          {project.content.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {block.type === "text" && (
                <div className="font-terminal text-foreground/90 prose-invert">
                  {block.content.split("\n").map((line, i) => {
                    if (line.startsWith("## ")) {
                      return (
                        <h2
                          key={i}
                          className="font-cyber text-2xl text-primary neon-text mt-8 mb-4"
                        >
                          {line.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <p key={i} className="text-muted-foreground ml-4">
                          {">"} {line.replace("- ", "")}
                        </p>
                      );
                    }
                    return (
                      <p key={i} className="text-muted-foreground mb-2">
                        {line}
                      </p>
                    );
                  })}
                </div>
              )}

              {block.type === "code" && (
                <div className="border border-primary/30 bg-muted/20 overflow-hidden">
                  <div className="bg-primary/10 px-4 py-2 border-b border-primary/30 flex items-center justify-between">
                    <span className="font-terminal text-sm text-primary">
                      {block.language || "code"}.snippet
                    </span>
                    <span className="font-terminal text-xs text-muted-foreground">
                      [READ_ONLY]
                    </span>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="font-terminal text-sm text-primary/90">
                      {block.content}
                    </code>
                  </pre>
                </div>
              )}

              {block.type === "image" && (
                <div className="border border-primary/30 p-2">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <span className="font-terminal text-muted-foreground">
                      [IMAGE_PLACEHOLDER]
                    </span>
                  </div>
                  {block.alt && (
                    <p className="font-terminal text-xs text-muted-foreground mt-2 text-center">
                      {block.alt}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
