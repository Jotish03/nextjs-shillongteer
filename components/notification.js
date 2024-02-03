import React, { useEffect, useMemo } from "react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const Notification = ({ variant, title, description }) => {
  const { toast } = useToast();

  // Use useMemo to memoize the toast function
  const memoizedToast = useMemo(() => toast, [toast]);

  useEffect(() => {
    // This will trigger the toast whenever variant, title, or description changes
    memoizedToast({
      variant: variant,
      title: title,
      description: description,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  }, [variant, title, description, memoizedToast]);

  return null; // Since we're auto-triggering the toast, no need to render anything
};

export default Notification;
