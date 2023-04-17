import { VStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import FilterDark from "../../Data/filterDark.json";
import FilterLight from "../../Data/filterLight.json";
import Lottie from "lottie-react";

const SearchLoading = () => {
  const loadingSrc = useColorModeValue(FilterDark, FilterLight);

  return (
    <VStack py={{ base: "5", lg: "14" }}>
      <Lottie
        animationData={loadingSrc}
        style={{
          height: 70,
          cursor: "pointer",
          opacity: 0.3,
        }}
      />
    </VStack>
  );
};

export default SearchLoading;
