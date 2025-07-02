import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Button
        variant="ghost"
        onClick={() => navigate("/blog")}
        className="flex items-center text-brand-primary hover:text-brand-primary hover:bg-brand-mint/20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Button>
    </motion.div>
  );
};