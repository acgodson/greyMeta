import React from "react";
import { Box } from "@chakra-ui/react";
import Flashcard from "../components/flashcards";

const FlashcardList = ({ flashcards }) => {
  console.log(flashcards);
  return (
    <Box as="div" className="card-grid" my={5} mx={[3, 3]}>
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </Box>
  );
};

export default FlashcardList;
