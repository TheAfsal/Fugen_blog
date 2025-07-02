import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Edit, Heart, MessageCircle, Share2, Loader2, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Post } from "@/types/Post";

interface ArticleHeaderProps {
  post: Post;
  userId?: string;
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
  isDeleting: boolean;
  onDelete: () => void;
  onShare: () => void;
}

const ArticleHeader = ({
  post,
  userId,
  isLiked,
  setIsLiked,
  isDeleting,
  onDelete,
  onShare,
}: ArticleHeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <Badge className="bg-brand-mint/20 text-brand-primary hover:bg-brand-mint/30">
          Article
        </Badge>

        {userId === post.authorId && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/edit/${post.id}`)}
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
              disabled={isDeleting}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
        {post.title}
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-brand-mint text-brand-primary">
              {post.authorId?.charAt(0)?.toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Author</p>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : "text-gray-500"}`}
            disabled={isDeleting}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            <span>24</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500"
            disabled={isDeleting}
          >
            <MessageCircle className="w-5 h-5" />
            <span>12</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="flex items-center space-x-2 text-gray-500"
            disabled={isDeleting}
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};


export default ArticleHeader