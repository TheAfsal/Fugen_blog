import { motion } from "framer-motion";

interface PostHeaderProps {
  title: string;
  description: string;
}

const PostHeader = ({ title, description }: PostHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        <span>{title}</span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default PostHeader