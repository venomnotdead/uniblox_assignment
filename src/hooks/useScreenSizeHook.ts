"use client";
import { useState, useEffect } from "react";

const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
};

const useScreenSizeHook = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const getScreenType = (width: number) => {
    if (width < BREAKPOINTS.MOBILE) return "mobile";
    if (width < BREAKPOINTS.TABLET) return "tablet";
    return "desktop";
  };

  // Effect to handle resizing
  useEffect(() => {
    if (typeof window != undefined) {
      const handleResize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Return screen size and type
  return {
    screenSize,
    screenType: getScreenType(screenSize.width),
  };
};

export default useScreenSizeHook;
