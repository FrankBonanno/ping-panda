import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default LandingLayout;
