import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
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
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import SkeletonTable from "@/components/skeleton-table";
import NotificationContext from "@/store/notification-store";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import Head from "next/head";
import BottomCard from "@/components/cards/cardbottom";

const PreviousResult = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const notificationctx = useContext(NotificationContext);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const resultsPerPage = 10;

  const fetchData = async () => {
    const response = await axios.get("/api/previousresult");
    return response.data.reverse();
  };

  const { data: results, isLoading: loadingPreviousResult } = useQuery(
    "previousResults",
    fetchData,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  const deleteMutation = useMutation((id) => axios.delete(`/api/${id}`), {
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData("previousResults", (oldData) =>
        oldData.filter((result) => result._id !== deletedId)
      );
      notificationctx.showNotification({
        title: "Result Deleted Successfully",
        description: "Data deleted!",
        variant: "destructive",
      });
    },
    onError: (error) => {
      notificationctx.showNotification({
        title: "Error!",
        description: error.message || "Error has occurred",
        variant: "destructive",
      });
    },
  });

  const handleAddResult = async (e) => {
    e.preventDefault();
    try {
      await router.push("/add-result");
    } catch (error) {
      console.error("Error adding result:", error);
    }
  };

  const handleDelete = async (_id) => {
    deleteMutation.mutate(_id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  const totalResults = results?.length || 0;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, totalResults);

  const paginatedResults = results?.slice(startIndex, endIndex) || [];

  return (
    <>
      <Head>
        <title>Previous Teer Results - Shillong Teer Result</title>
        <meta
          name="description"
          content="Check out the previous Shillong Teer results along with results from other teer regions in India. Stay informed with the past teer results."
        />
        <meta
          name="keywords"
          content="teer, shillong teer, teer result, previous teer result, teer result history, teer result archive"
        />
        <meta name="author" content="Shillong Teer Result Archive" />
        <meta
          property="og:title"
          content="Previous Teer Results - Shillong Teer Result"
        />
        <meta
          property="og:description"
          content="Check out the previous Shillong Teer results along with results from other teer regions in India. Stay informed with the past teer results."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.shillongmorningsundayresult.com/previous-result"
        />
      </Head>

      <section className="flex items-center justify-center mt-10">
        {session && (
          <Button type="button" onClick={handleAddResult}>
            Add Previous Result
          </Button>
        )}
      </section>
      {loadingPreviousResult ? (
        <SkeletonTable />
      ) : (
        <main className="flex items-center justify-center mt-8 p-4 sm:p-0 lg:px-24">
          <Table>
            <TableCaption>Shillong Previous Result</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">City</TableHead>
                <TableHead className="text-black">Date</TableHead>
                <TableHead className="text-black">F/R</TableHead>
                <TableHead className="text-black">S/R</TableHead>
                {session && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedResults.map((result) => (
                <TableRow key={result._id}>
                  <TableCell>{result.city}</TableCell>
                  <TableCell>{formatDate(result.date)}</TableCell>
                  <TableCell>{result.fr}</TableCell>
                  <TableCell>{result.sr}</TableCell>
                  {session && (
                    <TableCell className="sm:w-auto">
                      <div>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(result._id)}
                          disabled={
                            deleteMutation.isLoading &&
                            deleteMutation.variables === result._id
                          }
                        >
                          {deleteMutation.isLoading &&
                          deleteMutation.variables === result._id ? (
                            <ClipLoader
                              size={20}
                              color={"#fff"}
                              loading={true}
                            />
                          ) : (
                            <MdDeleteOutline size={20} />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      )}

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
      <BottomCard />
    </>
  );
};

export default PreviousResult;
