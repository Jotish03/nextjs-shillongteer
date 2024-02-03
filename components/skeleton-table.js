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
    <>
      <main className="flex items-center justify-center ">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: 4 }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-4 w-[450px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Loop to generate rows */}
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* Loop to generate cells */}
                {Array.from({ length: 4 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 w-[250px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  );
};

export default SkeletonTable;
