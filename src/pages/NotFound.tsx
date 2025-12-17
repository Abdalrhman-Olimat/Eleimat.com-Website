import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-cyber text-8xl md:text-9xl text-primary neon-text">
            404
          </h1>
        </motion.div>

        {/* Warning Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto border-2 border-destructive/50 bg-destructive/5 p-6 mb-8 relative"
        >
          <div className="absolute -top-3 left-6 bg-background px-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="font-terminal text-xs text-destructive">
              [ERROR]
            </span>
          </div>

          <h2 className="font-cyber text-2xl text-destructive mb-4">
            ACCESS_DENIED
          </h2>
          <p className="font-terminal text-muted-foreground">
            {">"} The requested resource could not be located in the system.
          </p>
          <p className="font-terminal text-muted-foreground mt-2">
            {">"} Path: <span className="text-secondary">{location.pathname}</span>
          </p>
        </motion.div>

        {/* System Log */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl mx-auto mb-8 text-left"
        >
          <div className="border border-primary/30 bg-card p-4 font-terminal text-sm space-y-1">
            <p className="text-muted-foreground">
              <span className="text-primary">[SYSTEM]</span> Attempting to locate resource...
            </p>
            <p className="text-muted-foreground">
              <span className="text-destructive">[FAIL]</span> Resource not found in database
            </p>
            <p className="text-muted-foreground">
              <span className="text-destructive">[FAIL]</span> Backup lookup failed
            </p>
            <p className="text-muted-foreground">
              <span className="text-secondary">[RECO]</span> Suggested action: Return to home
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 border-2 border-primary bg-primary/10 font-terminal text-lg text-primary hover:bg-primary hover:text-background transition-all duration-300 neon-border"
          >
            <Home className="w-5 h-5" />
            {">"} RETURN_HOME
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border-2 border-secondary bg-secondary/10 font-terminal text-lg text-secondary hover:bg-secondary hover:text-background transition-all duration-300 neon-border-purple"
          >
            <ArrowLeft className="w-5 h-5" />
            {">"} GO_BACK
          </button>
        </motion.div>

        {/* ASCII Art */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 font-terminal text-xs text-primary/30 hidden md:block"
        >
{`
    ██╗  ██╗ ██████╗ ██╗  ██╗
    ██║  ██║██╔═══██╗██║  ██║
    ███████║██║   ██║███████║
    ╚════██║██║   ██║╚════██║
         ██║╚██████╔╝     ██║
         ╚═╝ ╚═════╝      ╚═╝
       FILE NOT FOUND
`}
        </motion.pre>
      </div>
    </main>
  );
};

export default NotFound;
