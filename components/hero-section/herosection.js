import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import Lottie from "react-lottie";
import animationData from "../../public/images/teerlogo.json";
import { Input } from "../ui/input";
import NotificationContext from "@/store/notification-store";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
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
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";

const HeroSection = () => {
  const { data: session, status } = useSession();
  console.log(session?.user?.role);

  const [morningResult, setMorningResult] = useState("XX");
  const [eveningResult, setEveningResult] = useState("XX");
  const [loadingResult, setLoadingResult] = useState(true);
  const [loadingMorningUpdate, setLoadingMorningUpdate] = useState(false);
  const [loadingEveningUpdate, setLoadingEveningUpdate] = useState(false);
  const [loadingMorningDelete, setLoadingMorningDelete] = useState(false);
  const [loadingEveningDelete, setLoadingEveningDelete] = useState(false);

  const notificationctx = useContext(NotificationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const morningResponse = await axios.get("/api/morningresult");
        setMorningResult(morningResponse.data.result?.result || "XX");
        const eveningResponse = await axios.get("/api/eveningresult");
        setEveningResult(eveningResponse.data.result?.result || "XX");
        setLoadingResult(false);
      } catch (error) {
        console.error("Error fetching results:", error);
        setLoadingResult(false);
      }
    };

    fetchData();
  }, []);

  const handleMorningUpdate = async () => {
    try {
      setLoadingMorningUpdate(true);
      const res = await axios.post(
        "/api/morningresult",
        { morningResult },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      notificationctx.showNotification({
        title: "Morning Result Added Successfully",
        description: "Result Added",
        variant: "blackToast",
      });
      setMorningResult(morningResult);
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Adding Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoadingMorningUpdate(false);
    }
  };

  const handleEveningUpdate = async () => {
    try {
      setLoadingEveningUpdate(true);
      const res = await axios.post(
        "/api/eveningresult",
        { eveningResult },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      notificationctx.showNotification({
        title: "Evening Result Added Successfully",
        description: "Result Added",
        variant: "blackToast",
      });
      setEveningResult(eveningResult);
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Adding Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoadingEveningUpdate(false);
    }
  };

  const handleMorningDelete = async () => {
    try {
      setLoadingMorningDelete(true);
      const res = await axios.delete("/api/morningresult");

      notificationctx.showNotification({
        title: "Result Deleted Successfully",
        description: "Data Deleted",
        variant: "destructive",
      });
      setMorningResult("XX");
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Deleting Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoadingMorningDelete(false);
    }
  };

  const handleEveningDelete = async () => {
    try {
      setLoadingEveningDelete(true);
      const res = await axios.delete("/api/eveningresult");

      notificationctx.showNotification({
        title: "Result Deleted Successfully",
        description: "Data Deleted",
        variant: "destructive",
      });
      setEveningResult("XX");
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Deleting Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoadingEveningDelete(false);
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
            <Lottie isClickToPauseDisabled options={defaultOptions} />
          </div>
        </div>
      </div>
      <div className="w-full mt-[-100px] lg:mt-0 md:mt-0 md:w-2/4 p-10">
        <Table>
          <TableCaption>Shillong Teer Result</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center font-bold">
                F/R - 10:25 AM
              </TableHead>
              <TableHead className="w-[100px] text-center font-bold">
                S/R - 11:25AM
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
                      {session ? (
                        <>
                          <Input
                            type="text"
                            className="text-center"
                            value={morningResult}
                            onChange={(e) => setMorningResult(e.target.value)}
                          />
                          <div className="flex gap-1 mt-4">
                            <Button
                              onClick={handleMorningUpdate}
                              disabled={loadingMorningUpdate}
                            >
                              {loadingMorningUpdate ? (
                                <ClipLoader
                                  size={20}
                                  color={"#000"}
                                  loading={true}
                                />
                              ) : (
                                <IoMdAdd size={20} />
                              )}
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleMorningDelete}
                              disabled={loadingMorningDelete}
                            >
                              {loadingMorningDelete ? (
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
                        </>
                      ) : (
                        morningResult
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
                      {session ? (
                        <>
                          <Input
                            type="text"
                            className="text-center"
                            value={eveningResult}
                            onChange={(e) => setEveningResult(e.target.value)}
                          />
                          <div className="flex gap-1 mt-4">
                            <Button
                              onClick={handleEveningUpdate}
                              disabled={loadingEveningUpdate}
                            >
                              {loadingEveningUpdate ? (
                                <ClipLoader
                                  size={20}
                                  color={"#000"}
                                  loading={true}
                                />
                              ) : (
                                <IoMdAdd size={20} />
                              )}
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleEveningDelete}
                              disabled={loadingEveningDelete}
                            >
                              {loadingEveningDelete ? (
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
                        </>
                      ) : (
                        eveningResult
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
