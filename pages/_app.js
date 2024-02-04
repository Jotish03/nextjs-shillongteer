import FramerMotion from "@/components/framer-motion";
import Layout from "@/components/layout";
import { NotificationContextProvider } from "@/store/notification-store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <FramerMotion>
          <Component {...pageProps} />
        </FramerMotion>
      </Layout>
    </NotificationContextProvider>
  );
}
