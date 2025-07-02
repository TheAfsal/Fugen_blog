import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../../services/post.api";
import { updatePost as updatePostAction } from "../../store/slices/postSlice";
import { Post } from "../../types/Post";
import { AxiosError } from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { PostFormData, PostSchema } from "@/types/schema/PostSchema";
import { BackButton } from "./BackButton";

export const EditPost = ({ post }: { post: Post | null }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      setError("Post ID is missing");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data: PostFormData = { title, content };
      const result = PostSchema.safeParse(data);
      if (!result.success) {
        setError(result.error.errors[0].message);
        setLoading(false);
        return;
      }

      const updatedPost = await updatePost(id, { title, content });
      dispatch(updatePostAction(updatedPost));
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <BackButton />
      <h2 className="text-2xl mb-4">Edit Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={5}
            required
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          className="w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Updating Post...
            </>
          ) : (
            "Update Post"
          )}
        </Button>
      </form>
    </div>
  );
};
