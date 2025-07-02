import { useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { deletePost as deletePostApi } from "../services/post.api";
import { AxiosError } from "axios";
import { deletePost, setError } from "@/store/slices/postSlice";
import { BackButton } from "@/components/post/BackButton";
import DeleteDialog from "@/components/post/DeleteDialog";
import { LoadingSpinner } from "@/components/post/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";

const ArticleHeader = lazy(() => import("@/components/post/ArticleHeader"));
const ArticleContent = lazy(() => import("@/components/post/ArticleContent"));
const RelatedPosts = lazy(() => import("@/components/post/RelatedPosts"));
const PostNotFound = lazy(() => import("@/components/post/PostNotFound"));

export const SingleBlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);
  const { user } = useSelector((state: RootState) => state.auth);

  const post = posts.find((p) => p.id === id);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const relatedPosts = posts.filter((p) => p.id !== id).slice(0, 3);

  const handleShare = async () => {};

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await deletePostApi(id);
      dispatch(deletePost(id));
      navigate("/blog");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      dispatch(
        setError(error.response?.data?.message || "Failed to delete post")
      );
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
    }
  };

  if (!post) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <PostNotFound />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <Suspense fallback={<LoadingSpinner />}>
          <ArticleHeader
            post={post}
            userId={user?.id}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            isDeleting={isDeleting}
            onDelete={() => setIsConfirmOpen(true)}
            onShare={handleShare}
          />
          <ArticleContent post={post} />
          {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </Suspense>
        <DeleteDialog
          open={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
};
