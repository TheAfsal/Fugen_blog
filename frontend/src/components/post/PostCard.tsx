import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/types/Post";

interface PostCardProps {
  post: Post;
  userId?: string;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const PostCard = ({ post, userId, onDelete, isDeleting }: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <Badge
            variant="secondary"
            className="bg-brand-mint/20 text-brand-primary hover:bg-brand-mint/30"
          >
            Article
          </Badge>
          {userId === post.authorId && (
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
                <DropdownMenuItem onClick={() => navigate(`/edit/${post.id}`)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(post.id)}
                  className="text-red-600"
                  disabled={isDeleting}
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
  );
};

export default PostCard;