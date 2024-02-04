import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import SkeletonTable from "@/components/skeleton-table";
import NotificationContext from "@/store/notification-store";

const PreviousResult = () => {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loadingPreviousResult, setLoadingPreviousResult] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationctx = useContext(NotificationContext);

  const resultsPerPage = 10;
  const isAdmin = true;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/previousresult");
      setResults(response.data.reverse()); // Reverse the order of results
      setLoadingPreviousResult(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingPreviousResult(false);
    }
  };

  const handleAddResult = async (e) => {
    e.preventDefault();
    await router.push("/add-result");
    fetchData();
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/api/${_id}`);
      setResults(results.filter((result) => result._id !== _id));
      notificationctx.showNotification({
        title: "Result Deleted Successfully",
        description: "Data deleted!",
        variant: "destructive",
      });
    } catch (error) {
      notificationctx.showNotification({
        title: "Error!",
        description: error.message || "Error has occured",
        variant: "destructive",
      });
      console.error("Error deleting data:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, totalResults);

  return (
    <>
      <section className="flex items-center justify-center mt-10">
        <Button type="button" onClick={handleAddResult}>
          Add Previous Result
        </Button>
      </section>
      <main className="flex items-center justify-center mt-8 p-4 sm:p-0 lg:px-24">
        {loadingPreviousResult ? (
          <SkeletonTable />
        ) : (
          <Table>
            <TableCaption>Shillong Previous Result</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>F/R</TableHead>
                <TableHead>S/R</TableHead>
                {isAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.slice(startIndex, endIndex).map((result) => (
                <TableRow key={result._id}>
                  <TableCell>{result.city}</TableCell>
                  <TableCell>{formatDate(result.date)}</TableCell>
                  <TableCell>{result.fr}</TableCell>
                  <TableCell>{result.sr}</TableCell>
                  {isAdmin && (
                    <TableCell className="w-28 sm:w-auto">
                      <div>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(result._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>

      {totalPages > 1 && (
        <section className="mt-10 mb-8">
          <Pagination>
            <PaginationContent className="cursor-pointer">
              {currentPage !== 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(currentPage - 1)}
                  />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={i + 1 === currentPage}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </section>
      )}
    </>
  );
};

export default PreviousResult;
