import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  searchTerm: string;
  user: { id: string } | null;
}

const EmptyState = ({ searchTerm, user }: EmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-brand-mint/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Eye className="w-12 h-12 text-brand-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-4">No posts found</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {searchTerm ? "Try adjusting your search terms" : "Be the first to create a post!"}
        </p>
        {user && !searchTerm && (
          <Button
            onClick={() => navigate("/create")}
            className="cursor-pointer"
          >
            Create Your First Post
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default EmptyState