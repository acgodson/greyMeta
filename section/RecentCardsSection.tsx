import React from "react";
import { Heading, SlideFade, SimpleGrid } from "@chakra-ui/react";
import { liveNFTs } from "../contexts/GlobalContext";
import { LiveProjectCard } from "../components/LiveProjectCard";

export const RecentCardsSection = ({ project }) => {
  return (
    <SlideFade in offsetY={80} delay={0.2}>
      <Heading
        as="h1"
        fontSize={{ base: "18px", md: "20px", lg: "24px" }}
        mb={3}
        color="blue.500"
        bgColor="blue.100"
        width="fit-content"
        p={1.5}
        borderRadius="8px"
        opacity="0.75"
      >
        Recent Collections
      </Heading>

      <SimpleGrid columns={[1, 2, 2, 2]} mt={5}>
        {liveNFTs.map((project) => {
          return <LiveProjectCard key={project.name} project={project} />;
        })}
      </SimpleGrid>
    </SlideFade>
  );
};
