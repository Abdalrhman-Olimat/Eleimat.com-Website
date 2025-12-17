import { Link, useLocation, useNavigate } from "react-router-dom";
import { ScrambleText } from "./ScrambleText";
import { Terminal, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/#about", label: "About", isAnchor: true },
  { path: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.isAnchor) {
      e.preventDefault();
      if (location.pathname === "/") {
        // Already on home, just scroll
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Navigate to home first, then scroll
        navigate("/");
        setTimeout(() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
            <span className="font-cyber text-primary text-lg tracking-wider neon-text">
              A.E
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(link, e)}
                className={`font-terminal text-xl tracking-wide transition-all duration-300 hover:text-secondary ${
                  location.pathname === link.path || (link.isAnchor && location.pathname === "/" && location.hash === "#about")
                    ? "text-secondary neon-text-purple"
                    : "text-primary"
                }`}
              >
                <ScrambleText text={link.label} />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary hover:text-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary/20 bg-background"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(link, e)}
                  className={`block font-terminal text-xl tracking-wide ${
                    location.pathname === link.path
                      ? "text-secondary neon-text-purple"
                      : "text-primary"
                  }`}
                >
                  {">"} {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
