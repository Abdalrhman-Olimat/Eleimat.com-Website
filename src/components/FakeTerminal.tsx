import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Terminal } from "lucide-react";

interface LogEntry {
  timestamp: string;
  action: string;
  path: string;
}

export const FakeTerminal = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: false });
  };

  useEffect(() => {
    const newLog: LogEntry = {
      timestamp: getTimestamp(),
      action: "User navigated to",
      path: location.pathname,
    };
    setLogs((prev) => [...prev.slice(-9), newLog]);
  }, [location.pathname]);

  // Listen for custom events
  useEffect(() => {
    const handleCustomAction = (e: CustomEvent) => {
      const newLog: LogEntry = {
        timestamp: getTimestamp(),
        action: e.detail.action,
        path: e.detail.path || "",
      };
      setLogs((prev) => [...prev.slice(-9), newLog]);
    };

    window.addEventListener("terminal-log" as any, handleCustomAction);
    return () => {
      window.removeEventListener("terminal-log" as any, handleCustomAction);
    };
  }, []);

  const displayedLogs = isExpanded ? logs : logs.slice(-1);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-primary/30"
      animate={{ height: isExpanded ? "200px" : "auto" }}
      transition={{ duration: 0.3 }}
    >
      {/* Log Content - Now shown by default */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 hover:bg-primary/5 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-terminal text-primary text-sm">
            SYSTEM_LOG.exe
          </span>
          <span className="text-muted-foreground font-terminal text-xs">
            [{logs.length} entries]
          </span>
          <div className="ml-auto">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-primary" />
            ) : (
              <ChevronUp className="w-4 h-4 text-primary" />
            )}
          </div>
        </div>

        {/* Preview logs (last 3) */}
        <div className={isExpanded ? "h-[160px] overflow-y-auto" : ""}>
          {displayedLogs.length === 0 ? (
            <p className="font-terminal text-muted-foreground text-sm">
              {">"} Waiting for user input...
            </p>
          ) : (
            displayedLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-terminal text-sm flex gap-2"
              >
                <span className="text-muted-foreground">[{log.timestamp}]</span>
                <span className="text-primary">{log.action}</span>
                <span className="text-secondary">{log.path}</span>
              </motion.div>
            ))
          )}
        </div>
      </button>
    </motion.div>
  );
};

// Helper to log custom actions
export const logTerminalAction = (action: string, path?: string) => {
  window.dispatchEvent(
    new CustomEvent("terminal-log", { detail: { action, path } })
  );
};
