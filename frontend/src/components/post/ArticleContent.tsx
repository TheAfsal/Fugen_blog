import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/types/Post";

interface ArticleContentProps {
  post: Post;
}

 const ArticleContent = ({ post }: ArticleContentProps) => {
  return (
    <>
      <Separator className="mb-8" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="prose prose-lg max-w-none"
      >
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default ArticleContent