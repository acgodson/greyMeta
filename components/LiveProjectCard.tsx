import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  VStack,
  LinkOverlay,
} from "@chakra-ui/react";
import { MotionBox } from "../utils/motion";
import Paragraph from "./Paragraph";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";
import { BsBox } from "react-icons/bs";

export const LiveProjectCard = ({ project }) => (
  <MotionBox whileHover={{ y: -5 }}>
    <Box
      p={4}
      display={{ md: "flex" }}
      borderWidth={1}
      margin={2}
      rounded={"10px"}
      _hover={{
        borderColor: "blue.500",
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-around"
        direction={{ base: "column", md: "row" }}
      >
        <Image
          margin="auto"
          src={project.imageUrl}
          alt={project.alt}
          objectFit={"cover"}
          boxSize={["100px", "150px", "150px", "150px"]}
        />
        <Flex flexDirection="column" ml={[0, 5, 5]} mt={[5, 5, 0, 0]}>
          <Heading as="h2" fontSize="lg" fontWeight="600" color={"blue.400"}>
            {project.name}
            <br />
            <Box as="span"
            
            fontSize="sm"
            opacity="0.6"
            >by Godson Ani</Box>
          </Heading>

          <Box mt={"10px"}>
            <Text>{project.summary}</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  </MotionBox>
);
