import { SessionProvider } from "next-auth/react";
import { NotificationContextProvider } from "@/store/notification-store";
import FramerMotion from "@/components/framer-motion";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <SessionProvider session={session}>
          <Layout>
            <FramerMotion>
              <Component {...pageProps} />
            </FramerMotion>
          </Layout>
        </SessionProvider>
      </NotificationContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
