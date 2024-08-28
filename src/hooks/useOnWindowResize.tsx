import * as React from "react";

const useOnWindowResize = (handler: { (): void }) => {
  React.useEffect(() => {
    const handleResize = () => {
      handler();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handler]);
};

export default useOnWindowResize;
