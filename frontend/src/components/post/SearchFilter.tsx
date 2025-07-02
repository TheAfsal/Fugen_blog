import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  user: { id: string } | null;
}

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  handleSearch,
  user,
}: SearchFilterProps) => {
  const navigate = useNavigate();

  return (
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
            Sort by: {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : "Title"}
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
  );
};

export default SearchFilter