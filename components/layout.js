import { useContext } from "react";

import NavigationBar from "./navigation/header";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NotificationContext from "@/store/notification-store";
import Notification from "./notification";
import Head from "next/head";

export default function Layout({ children }) {
  const notificationctx = useContext(NotificationContext);
  const activeNotification = notificationctx.notification;
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </Head>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <main>
          <NavigationBar />

          {children}
        </main>
        <Toaster />
        {activeNotification && (
          <Notification
            variant={activeNotification.variant}
            title={activeNotification.title}
            description={activeNotification.description}
          />
        )}
      </ThemeProvider>
    </>
  );
}
