import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PostNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
      </div>
    </div>
  );
};

export default PostNotFound