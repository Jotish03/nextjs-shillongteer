// components/CustomRouter.js

import { useRouter } from "next/router";
import { motion } from "framer-motion";

const FramerMotion = ({ children }) => {
  const router = useRouter();

  return (
    <motion.div
      key={router.route}
      initial={{ opacity: 0, y: "100vh" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100vh" }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default FramerMotion;
