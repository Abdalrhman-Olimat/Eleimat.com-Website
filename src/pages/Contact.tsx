import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, Send, Terminal } from "lucide-react";
import { logTerminalAction } from "@/components/FakeTerminal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    logTerminalAction("Form submitted:", formData.email);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      logTerminalAction("Message sent:", "SUCCESS");
    }, 1500);
  };

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-cyber text-4xl md:text-5xl text-primary neon-text mb-4">
            ESTABLISH_CONNECTION
          </h1>
          <p className="font-terminal text-muted-foreground text-lg">
            {">"} Initializing secure communication channel...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="border-2 border-primary/30 p-6 relative">
              <div className="absolute -top-3 left-6 bg-background px-3">
                <span className="font-terminal text-xs text-secondary">
                  [TRANSMISSION_FORM]
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block font-terminal text-primary mb-2">
                    {">"} IDENTIFIER:
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-muted/20 border border-primary/30 px-4 py-3 font-terminal text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
                    placeholder="Enter your name..."
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block font-terminal text-primary mb-2">
                    {">"} COMM_ADDRESS:
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-muted/20 border border-primary/30 px-4 py-3 font-terminal text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block font-terminal text-primary mb-2">
                    {">"} MESSAGE_PAYLOAD:
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full bg-muted/20 border border-primary/30 px-4 py-3 font-terminal text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-colors resize-none"
                    placeholder="Enter your message..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-secondary bg-secondary/10 font-terminal text-xl text-secondary hover:bg-secondary hover:text-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Terminal className="w-5 h-5 animate-pulse" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      SEND_TRANSMISSION
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Direct Links */}
            <div className="border-2 border-primary/30 p-6 relative">
              <div className="absolute -top-3 left-6 bg-background px-3">
                <span className="font-terminal text-xs text-secondary">
                  [DIRECT_CHANNELS]
                </span>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center gap-4 p-4 border border-primary/30 hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group"
                  onClick={() => logTerminalAction("External link:", "Email")}
                >
                  <Mail className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                  <div>
                    <p className="font-terminal text-primary group-hover:text-secondary transition-colors">
                      EMAIL
                    </p>
                    <p className="font-terminal text-sm text-muted-foreground">
                      contact@example.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-primary/30 hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group"
                  onClick={() => logTerminalAction("External link:", "GitHub")}
                >
                  <Github className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                  <div>
                    <p className="font-terminal text-primary group-hover:text-secondary transition-colors">
                      GITHUB
                    </p>
                    <p className="font-terminal text-sm text-muted-foreground">
                      github.com/username
                    </p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-primary/30 hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group"
                  onClick={() => logTerminalAction("External link:", "LinkedIn")}
                >
                  <Linkedin className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                  <div>
                    <p className="font-terminal text-primary group-hover:text-secondary transition-colors">
                      LINKEDIN
                    </p>
                    <p className="font-terminal text-sm text-muted-foreground">
                      linkedin.com/in/username
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Status */}
            <div className="border-2 border-primary/30 p-6 relative">
              <div className="absolute -top-3 left-6 bg-background px-3">
                <span className="font-terminal text-xs text-secondary">
                  [STATUS]
                </span>
              </div>

              <div className="space-y-3 font-terminal">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="text-primary flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="text-secondary">{"<"} 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Open to Work</span>
                  <span className="text-primary">YES</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
