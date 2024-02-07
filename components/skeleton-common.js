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

const SkeletonCommon = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-18 mt-32 p-4 ">
      <section className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-6">
        <Table>
          <TableCaption>
            <Skeleton className="h-4 w-full" />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-full" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-full" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-full" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>

              <TableCell className="w-0">
                <Skeleton className="h-4 w-full" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </main>
  );
};

export default SkeletonCommon;
