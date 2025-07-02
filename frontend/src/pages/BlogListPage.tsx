import { useEffect, useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, deletePost as deletePostApi } from "../services/post.api";
import {
  setPosts,
  deletePost,
  setLoading,
  setError,
} from "../store/slices/postSlice";
import type { AxiosError } from "axios";
import type { RootState } from "../store";
import PostHeader from "../components/post/PostHeaders";
import Pagination from "../components/post/Pagination";
import { LoadingSpinner } from "../components/post/LoadingSpinner";

const SearchFilter = lazy(() => import("../components/post/SearchFilter"));
const PostsGrid = lazy(() => import("../components/post/PostsGrid"));
const ErrorMessage = lazy(() => import("../components/post/ErrorMessage"));
const EmptyState = lazy(() => import("../components/post/EmptyState"));

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const BlogListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [total, setTotal] = useState(0);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [confirmDeletePostId, setConfirmDeletePostId] = useState<string | null>(
    null
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading());
      try {
        const data = await getPosts(page, limit, debouncedSearchTerm);
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
  }, [dispatch, page, limit, debouncedSearchTerm]);

  const handleDelete = async (id: string) => {
    setDeletingPostId(id);
    try {
      await deletePostApi(id);
      dispatch(deletePost(id));
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      dispatch(
        setError(error.response?.data?.message || "Failed to delete post")
      );
    } finally {
      setDeletingPostId(null);
      setConfirmDeletePostId(null);
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

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PostHeader
          title="Discover Stories"
          description="Explore amazing content from our community of writers"
        />
        <Suspense fallback={<LoadingSpinner />}>
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleSearch={handleSearch}
            user={user}
          />
        </Suspense>
        {/* {!loading && !error && filteredPosts.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )} */}
        {loading && <LoadingSpinner />}
        <Suspense fallback={<LoadingSpinner />}>
          {error && <ErrorMessage error={error} />}
          {!loading && !error && filteredPosts.length === 0 && (
            <EmptyState searchTerm={searchTerm} user={user} />
          )}
          {!loading && !error && filteredPosts.length > 0 && (
            <PostsGrid
              posts={filteredPosts}
              userId={user?.id}
              confirmDeletePostId={confirmDeletePostId}
              setConfirmDeletePostId={setConfirmDeletePostId}
              deletingPostId={deletingPostId}
              handleDelete={handleDelete}
            />
          )}
        </Suspense>
        {!loading && !error && filteredPosts.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
      </div>
    </div>
  );
};
