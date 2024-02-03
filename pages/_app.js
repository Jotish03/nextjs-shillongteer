import FramerMotion from "@/components/framer-motion";
import Layout from "@/components/layout";
import { NotificationContextProvider } from "@/store/notification-store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <FramerMotion>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FramerMotion>
    </NotificationContextProvider>
  );
}
