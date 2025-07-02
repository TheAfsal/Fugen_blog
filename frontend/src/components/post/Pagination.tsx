import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-between items-center mt-8">
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="h-10 px-4"
      >
        Previous
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="h-10 px-4"
      >
        Next
      </Button>
    </div>
  );
};

export default  Pagination