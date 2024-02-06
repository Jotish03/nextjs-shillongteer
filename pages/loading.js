import React from "react";
import Lottie from "react-lottie";
import animationData from "../public/images/loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center mt-[-200px] lg:mt-[-200px] bg-black bg-opacity-80 z-50">
      <div className="max-w-lg">
        <div className="flex items-center justify-center ">
          <div className="mt-[-160dvh] sm:mt-[-120dvh] md:mt-[-80dvh] lg:mt-0">
            <Lottie
              isClickToPauseDisabled
              options={defaultOptions}
              height={150}
              width={150}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
