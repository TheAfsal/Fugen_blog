import { motion } from "framer-motion";
import { RelatedPostCard } from "./RelatedPostCard";
import { Post } from "@/types/Post";

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-16"
    >
      <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <RelatedPostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default RelatedPosts;
