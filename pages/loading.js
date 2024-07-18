import React from "react";

import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center h-[120vh]  mt-[-200px] lg:mt-[-200px] lg:h-[150vh] bg-[#07373e] bg-opacity-90 z-50">
      <div className="max-w-lg">
        <div className="flex items-center justify-center ">
          <div className="mt-[10dvh] sm:mt-[-120dvh] md:mt-[-80dvh] lg:mt-0">
            <PuffLoader size={100} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
