import { useState, useCallback } from "react";
import { BootSequence } from "@/components/BootSequence";
import Home from "./Home";

const Index = () => {
  const [bootComplete, setBootComplete] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  if (!bootComplete) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return <Home />;
};

export default Index;
