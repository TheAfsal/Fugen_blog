import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./PostCard";
import DeleteDialog from "./DeleteDialog";
import { Post } from "@/types/Post";

interface PostsGridProps {
  posts: Post[];
  userId: string | undefined;
  confirmDeletePostId: string | null;
  setConfirmDeletePostId: (id: string | null) => void;
  deletingPostId: string | null;
  handleDelete: (id: string) => Promise<void>;
}

const PostsGrid = ({
  posts,
  userId,
  confirmDeletePostId,
  setConfirmDeletePostId,
  deletingPostId,
  handleDelete,
}: PostsGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <PostCard
                post={post}
                userId={userId}
                onDelete={() => setConfirmDeletePostId(post.id)}
                isDeleting={deletingPostId === post.id}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <DeleteDialog
        open={!!confirmDeletePostId}
        onOpenChange={() => setConfirmDeletePostId(null)}
        onConfirm={() =>
          confirmDeletePostId && handleDelete(confirmDeletePostId)
        }
        isDeleting={!!deletingPostId}
      />
    </>
  );
};

export default PostsGrid;
