import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import axios from "axios"; // Import Axios

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/router";

const AddResult = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    city: "",
    date: "",
    fr: "",
    sr: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Make handleSubmit asynchronous
    e.preventDefault();
    try {
      // Perform Axios POST request
      await axios.post("/api/addresult", formData);
      // Reset form data after successful submission
      setFormData({
        city: "",
        date: "",
        fr: "",
        sr: "",
      });
      console.log("Result added successfully!");
      router.push("/previous-result");
    } catch (error) {
      console.error("Error adding result:", error);
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    router.push("/previous-result");
  };

  return (
    <main className="flex items-center justify-center p-8 min-h-[90vh]">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>Update Previous Result</CardTitle>
          <CardDescription>Add Previous Result below:</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        format(new Date(formData.date), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) =>
                        setFormData({ ...formData, date: date })
                      }
                      initialFocus
                      name="date"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fr">F/R</Label>
                <Input
                  id="fr"
                  name="fr"
                  value={formData.fr}
                  onChange={handleChange}
                  placeholder="Enter City"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="sr">S/R</Label>
                <Input
                  id="sr"
                  name="sr"
                  value={formData.sr}
                  onChange={handleChange}
                  placeholder="Enter City"
                />
              </div>
              <CardFooter className="flex justify-end gap-2 mr-[-20px]">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">Add Result</Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default AddResult;
