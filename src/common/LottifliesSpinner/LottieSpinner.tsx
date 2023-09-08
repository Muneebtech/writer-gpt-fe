import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import Loader from "@/common/Loader.json";

const LottieSpinner = () => {
  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    // Simulate loading delay (remove this in your actual code)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="relative">
      {/* Backdrop */}
      <div
        className={`${
          loading ? 'block' : 'hidden'
        } fixed inset-0 backdrop-blur-3xl bg-gray-900 bg-opacity-50 z-50`}
      ></div>

      {/* Lottie Spinner */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Lottie options={defaultOptions} height={100} width={100} />
        {/* You can adjust height and width as needed */}
      </div>
    </div>
  );
};

export default LottieSpinner;
