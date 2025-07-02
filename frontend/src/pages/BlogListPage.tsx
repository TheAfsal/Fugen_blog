import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Calendar, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "../store";
import { getPosts, deletePost as deletePostApi } from "../services/post.api";
import {
  setPosts,
  deletePost,
  setLoading,
  setError,
} from "../store/slices/postSlice";
import type { AxiosError } from "axios";

export const BlogListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [total, setTotal] = useState(0);

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading());
      try {
        const data = await getPosts(page, limit, searchTerm);
        dispatch(setPosts(data.posts));
        setTotal(data.total);
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        dispatch(
          setError(error.response?.data?.message || "Failed to fetch posts")
        );
      }
    };
    fetchPosts();
  }, [dispatch, page, limit, searchTerm]);

  const handleDelete = async (id: string) => {
    try {
      await deletePostApi(id);
      dispatch(deletePost(id));
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      dispatch(
        setError(error.response?.data?.message || "Failed to delete post")
      );
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const filteredPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(total / limit);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

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
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span>Discover Stories</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore amazing content from our community of writers
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl border-2 focus:border-brand-mint"
            />
          </form>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-12 px-6 rounded-xl border-2 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Sort by:{" "}
                {sortBy === "newest"
                  ? "Newest"
                  : sortBy === "oldest"
                  ? "Oldest"
                  : "Title"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("newest")}>
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("title")}>
                Title A-Z
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user && (
            <Button
              onClick={() => navigate("/create")}
              className="h-12 px-6 rounded-xl"
            >
              Create Post
            </Button>
          )}
        </motion.div>

        {/* Pagination */}
        {/* <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="h-10 px-4"
          >
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="h-10 px-4"
          >
            Next
          </Button>
        </div> */}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 max-w-md mx-auto">
              <p className="text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredPosts.length === 0 && (
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
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Be the first to create a post!"}
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
        )}

        {/* Posts Grid */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        variant="secondary"
                        className="bg-brand-mint/20 text-brand-primary hover:bg-brand-mint/30"
                      >
                        Article
                      </Badge>
                      {user?.id === post.authorId && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => navigate(`/edit/${post.id}`)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    <h3 className="text-xl font-bold line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-brand-mint text-brand-primary text-sm">
                            {post.authorId?.charAt(0)?.toUpperCase() || "A"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/post/${post.id}`)}
                        className="text-brand-primary hover:text-brand-primary hover:bg-brand-mint/20"
                      >
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="h-10 px-4"
            >
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="h-10 px-4"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
