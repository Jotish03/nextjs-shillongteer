import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdAdd } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners
import { useSession } from "next-auth/react";
import Link from "next/link";

import { z } from "zod"; // Import z function from Zod

import NotificationContext from "@/store/notification-store";
import Head from "next/head";

const schema = z.object({
  direct: z.string().min(1, { message: "Direct is required" }),
  house: z.string().min(1, { message: "House is required" }),
  ending: z.string().min(1, { message: "Ending is required" }),
});

const RoundOne = () => {
  const notificationctx = useContext(NotificationContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    direct: "",
    house: "",
    ending: "",
  });
  const [formErrors, setFormErrors] = useState({
    direct: "",
    house: "",
    ending: "",
  });
  const [loadingAddResult, setLoadingAddResult] = useState(false); // Add loading state for the "Add Result" button

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingAddResult(true); // Set loading state to true when submitting the form
    try {
      schema.parse(formData); // Validate form data against the schema
      await axios.post("/api/common-number/roundone", formData);
      setFormData({
        direct: "",
        house: "",
        ending: "",
      });
      notificationctx.showNotification({
        title: "Round 1 Added Successfully",
        description: "Success",
        variant: "blackToast",
      });
      console.log("Round 1 added successfully!");
      router.push("/common-number");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
      } else {
        notificationctx.showNotification({
          title: "Error adding result",
          description: "Check fields",
          variant: "destructive",
        });
        console.error("Error adding result:", error);
      }
    } finally {
      setLoadingAddResult(false);
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    router.push("/common-number");
  };

  return (
    <>
      {session ? (
        <main className="flex items-center justify-center p-8 min-h-[90vh]">
          <Card className="w-[550px]">
            <CardHeader>
              <CardTitle>Update Common Number</CardTitle>
              <CardDescription>Round One</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="direct">Direct</Label>
                    <Input
                      id="direct"
                      name="direct"
                      value={formData.direct}
                      onChange={handleChange}
                      placeholder="Enter Direct Number"
                    />
                    {formErrors.direct && (
                      <span className="text-red-500">{formErrors.direct}</span>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="house">House</Label>
                    <Input
                      id="house"
                      name="house"
                      value={formData.house}
                      onChange={handleChange}
                      placeholder="Enter House Number"
                    />
                    {formErrors.house && (
                      <span className="text-red-500">{formErrors.house}</span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="ending">Ending</Label>
                    <Input
                      id="ending"
                      name="ending"
                      value={formData.ending}
                      onChange={handleChange}
                      placeholder="Enter Ending Number"
                    />
                    {formErrors.ending && (
                      <span className="text-red-500">{formErrors.ending}</span>
                    )}
                  </div>
                  <CardFooter className="flex justify-end gap-2 mr-[-20px]">
                    <Button variant="outline" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {loadingAddResult ? (
                        <ClipLoader
                          size={20}
                          color={`#000 dark:#000`}
                          loading={true}
                        />
                      ) : (
                        <IoMdAdd size={20} />
                      )}
                    </Button>
                  </CardFooter>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      ) : (
        <div className="flex flex-col items-center justify-center h-[80dvh] gap-4">
          <p>Login to access</p>
          <Link href="/" className="">
            <Button className="font">Go to Homepage</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default RoundOne;
