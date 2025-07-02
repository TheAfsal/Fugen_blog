import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  ArrowLeft,
  Edit,
  Trash2,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { RootState } from "../store";
import { deletePost as deletePostApi } from "../services/post.api";
import { AxiosError } from "axios";
import { deletePost } from "@/store/slices/postSlice";

export const SingleBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);
  const { user } = useSelector((state: RootState) => state.auth);

  const post = posts.find((p) => p.id === id);
  const [isLiked, setIsLiked] = useState(false);

  const relatedPosts = posts.filter((p) => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {};

  const handleDelete = async (id: string) => {
    try {
      await deletePostApi(id);
      dispatch(deletePost(id));
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.log(error);

      // dispatch(
      //   setError(error.response?.data?.message || "Failed to delete post")
      // );
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
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

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Badge className="bg-brand-mint/20 text-brand-primary hover:bg-brand-mint/30">
                Article
              </Badge>

              {user?.id === post.authorId && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/edit/${post.id}`)}
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
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
                  className={`flex items-center space-x-2 ${
                    isLiked ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span>{24}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-500"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>12</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center space-x-2 text-gray-500"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/post/${relatedPost.id}`)}
                  >
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-3 line-clamp-2 hover:text-brand-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                        {relatedPost.content}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(relatedPost.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};
