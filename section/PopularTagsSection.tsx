import React from "react";
import {
  Heading,
  SlideFade,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import StackCard from "../components/StackCard";
import { gameTags } from "../contexts/GlobalContext";

const PopularTagsSection = () => {
  return (
    <SlideFade in offsetY={80} delay={0.2}>
      <Heading
        as="h1"
        fontSize={{ base: "18px", md: "20px", lg: "24px" }}
        mb={3}
        color= "blue.500"
        bgColor="blue.100"
        width="fit-content"
        p={1.5}
        borderRadius="8px"
        opacity="0.6"
      >
        Popular Tests
      </Heading>
    
      <Grid
        mt={5}
        templateColumns={[
          "1fr",
          "repeat(2,1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={[2, 5, 5, 5]}
      >
        {gameTags.map((stack) => (
          <StackCard stack={stack} key={stack?.name} />
        ))}
      </Grid>
    </SlideFade>
  );
};

export default PopularTagsSection;
