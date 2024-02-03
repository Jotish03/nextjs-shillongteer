import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "../ui/button";
import Lottie from "react-lottie";
import animationData from "../../public/images/teerlogo.json";
import { Input } from "../ui/input";
import axios from "axios";
import NotificationContext from "@/store/notification-store";

const HeroSection = () => {
  const [morningResult, setMorningResult] = useState("XX");
  const [eveningResult, setEveningResult] = useState("XX");
  const [loadingResult, setLoadingResult] = useState(true);
  const isAdmin = true;

  //context menu
  const notificationctx = useContext(NotificationContext);

  // Morning Result Fetch
  useEffect(() => {
    const fetchMorningResult = async () => {
      try {
        const response = await axios.get("/api/morningresult");
        setMorningResult(response.data.result?.result || "XX");
        setLoadingResult(false);
      } catch (error) {
        console.error("Error fetching morning result:", error);
        setLoadingResult(false);
      }
    };

    fetchMorningResult();
  }, []);

  // Evening Result Fetch
  useEffect(() => {
    const fetchEveningResult = async () => {
      try {
        const response = await axios.get("/api/eveningresult");
        setEveningResult(response.data.result?.result || "XX");
        setLoadingResult(false);
      } catch (error) {
        console.error("Error fetching evening result:", error);
        setEveningResult(false);
      }
    };

    fetchEveningResult();
  }, []);

  // handleMorningUpdate
  const handleMorningUpdate = async () => {
    try {
      const res = await axios.post(
        "/api/morningresult",
        { morningResult },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      notificationctx.showNotification({
        title: "Morning Result Added Successfully",
        description: "Result Added",
        variant: "secondary",
      });
      setMorningResult(morningResult); // Update morningResult state after successful update
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Adding Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  // handleEveningUpdate
  const handleEveningUpdate = async () => {
    try {
      const res = await axios.post(
        "/api/eveningresult",
        { eveningResult },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      notificationctx.showNotification({
        title: "Evening Result Added Successfully",
        description: "Result Added",
        variant: "primary",
      });
      setEveningResult(eveningResult); // Update eveningResult state after successful update
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Adding Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  // handleMorningDelete
  const handleMorningDelete = async () => {
    try {
      const res = await axios.delete("/api/morningresult");
      console.log(res.data);
      notificationctx.showNotification({
        title: "Result Deleted Successfully",
        description: "Data Deleted",
        variant: "destructive",
      });
      setMorningResult("XX"); // Reset morningResult state after successful deletion
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Deletting Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  // handleEveningDelete
  const handleEveningDelete = async () => {
    try {
      const res = await axios.delete("/api/eveningresult");
      console.log(res.data);
      notificationctx.showNotification({
        title: "Result Deleted Successfully",
        description: "Data Deleted",
        variant: "destructive",
      });
      setEveningResult("XX"); // Reset eveningResult state after successful deletion
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Deletting Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,

    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <main className="flex flex-wrap items-center justify-center">
      <div
        className="w-full md:w-auto md:flex-shrink-0 md:mr-8 mb-8 md:mb-0 relative"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="relative" style={{ width: "100%", paddingTop: "100%" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Lottie
              isClickToPauseDisabled
              options={defaultOptions}
              width={420}
              height={420}
            />
          </div>
        </div>
      </div>
      <div className="w-full  md:w-2/4 p-10">
        <Table>
          <TableCaption>Shillong Teer Result</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center font-bold">
                Morning 11:25 AM
              </TableHead>
              <TableHead className="w-[100px] text-center font-bold">
                Evening 5:25 PM
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-[100px] text-center font-medium">
                <div className="flex flex-col items-center justify-center">
                  {loadingResult ? (
                    <Skeleton className="w-[50px] h-[20px] rounded-full" />
                  ) : (
                    <>
                      {isAdmin ? (
                        <>
                          <Input
                            type="text"
                            className="text-center"
                            value={morningResult}
                            onChange={(e) => setMorningResult(e.target.value)}
                          />
                          <div className="flex flex-wrap gap-2">
                            <Button
                              className="mt-4"
                              onClick={handleMorningUpdate}
                            >
                              Add Result
                            </Button>
                            <Button
                              variant="destructive"
                              className="mt-4"
                              onClick={handleMorningDelete}
                            >
                              Delete
                            </Button>
                          </div>
                        </>
                      ) : (
                        morningResult // Display morningResult directly
                      )}
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="w-[100px] text-center font-medium">
                <div className="flex flex-col items-center justify-center">
                  {loadingResult ? (
                    <Skeleton className="w-[50px] h-[20px] rounded-full" />
                  ) : (
                    <>
                      {isAdmin ? (
                        <>
                          <Input
                            type="text"
                            className="text-center"
                            value={eveningResult}
                            onChange={(e) => setEveningResult(e.target.value)}
                          />
                          <div className="flex flex-wrap gap-2">
                            <Button
                              className="mt-4"
                              onClick={handleEveningUpdate}
                            >
                              Add Result
                            </Button>
                            <Button
                              variant="destructive"
                              className="mt-4"
                              onClick={handleEveningDelete}
                            >
                              Delete
                            </Button>
                          </div>
                        </>
                      ) : (
                        eveningResult // Display eveningResult directly
                      )}
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default HeroSection;
