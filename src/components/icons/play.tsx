
import React from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

import PlaySM from "./play-sm";
import PlayLg from "./play-lg";

type Size = "sm" | "md" | "lg";

interface PlayIconProps {
  size?: Size;
}

const PlayIcon: React.FC<PlayIconProps> = ({ size }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const selectedSize = size ?? (isMobile ? "sm" : "md");

  switch (selectedSize) {
    case "md":
      return <PlaySM />;
    case "lg":
      return <PlayLg />;
    default:
      return <PlaySM />;
  }
};

export default PlayIcon;