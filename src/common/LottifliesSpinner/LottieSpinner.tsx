import React from "react";
import Lottie from "react-lottie";
import Loader from "@/common/Loader.json";
const LottieSpinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    
  };
  return (
    <div className="backdrop-blur-3xl">
      <Lottie options={defaultOptions} height={100} width={100} />
      {/* You can adjust height and width as needed */}
    </div>
  );
};

export default LottieSpinner;
