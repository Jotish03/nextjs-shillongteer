import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const CardHolder = ({ url, title }) => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <Image
          src={url}
          width={500}
          height={500}
          className="dark:invert"
          layout="responsive"
          priority
          alt={title}
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="mt-2">Click to View</CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardHolder;
