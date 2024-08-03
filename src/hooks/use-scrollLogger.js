import { useEffect } from "react";

function useScrollLogger() {
  useEffect(() => {
    const handleScroll = () => {
      console.log(`Scroll position: ${window.scrollY}`);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}

export default useScrollLogger;
