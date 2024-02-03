import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SkeletonTable = ({ skeletonStyle }) => {
  // Define the number of rows
  const numRows = 10;

  return (
    <main className="flex items-center justify-center">
      <Table className="w-full overflow-x-auto">
        <TableHeader className="hidden md:flex">
          <TableRow className="flex">
            <TableHead className="flex-1">
              <Skeleton className="h-4 w-full md:w-[450px]" />
            </TableHead>
            <TableHead className="flex-1">
              <Skeleton className="h-4 w-full md:w-[450px]" />
            </TableHead>
            <TableHead className="flex-1">
              <Skeleton className="h-4 w-full md:w-[450px]" />
            </TableHead>
            <TableHead className="flex-1">
              <Skeleton className="h-4 w-full md:w-[450px]" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Loop to generate rows */}
          {Array.from({ length: numRows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="flex flex-wrap">
              {/* Loop to generate cells */}
              {Array.from({ length: 4 }).map((_, cellIndex) => (
                <TableCell key={cellIndex} className="flex-1 md:w-auto">
                  <Skeleton className="h-4 md:h-4 w-full md:w-[250px]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default SkeletonTable;
