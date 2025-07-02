import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/post.api";
import { addPost } from "../store/slices/postSlice";
import { AxiosError } from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { PostFormData, PostSchema } from "@/types/schema/PostSchema";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      const post = await createPost({ title, content });
      dispatch(addPost(post));
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Create Post</h2>
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
              Creating Post...
            </>
          ) : (
            "Create Post"
          )}
        </Button>
      </form>
    </div>
  );
};