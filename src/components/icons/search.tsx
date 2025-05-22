
import React from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

import SearchIconMd from "./search-md";
import SearchIconLg from "./search-lg";

type Size = "sm" | "md" | "lg";

interface SearchIconProps {
  size?: Size;
}

const SearchIcon: React.FC<SearchIconProps> = ({ size }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const selectedSize = size ?? (isMobile ? "sm" : "md");

  switch (selectedSize) {
    case "md":
      return <SearchIconMd />;
    case "lg":
      return <SearchIconLg />;
    default:
      return <SearchIconMd />;
  }
};

export default SearchIcon;