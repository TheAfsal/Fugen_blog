import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Post } from "@/types/Post";

interface RelatedPostCardProps {
  post: Post;
  index: number;
}

export const RelatedPostCard = ({ post, index }: RelatedPostCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={() => navigate(`/post/${post.id}`)}
      >
        <CardContent className="p-6">
          <h3 className="font-bold mb-3 line-clamp-2 hover:text-brand-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
            {post.content}
          </p>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
