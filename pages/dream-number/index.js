import DreamMeanings from "@/components/meaning";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableDemo = () => {
  return (
    <main className="flex items-center justify-center p-2 m-8">
      <Table>
        <TableCaption>A list of your dream meanings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Dream</TableHead>
            <TableHead>Direct</TableHead>
            <TableHead>House</TableHead>
            <TableHead>Ending</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DreamMeanings.map((dream) => (
            <TableRow key={dream.direct}>
              <TableCell>{dream.dream}</TableCell>
              <TableCell>{dream.direct}</TableCell>
              <TableCell>{dream.house}</TableCell>
              <TableCell>{dream.ending}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default TableDemo;
