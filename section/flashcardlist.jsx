import React from "react";
import { Box } from "@chakra-ui/react";
import Flashcard from "../components/flashcards";

const FlashcardList = ({ flashcards }) => {

 const _colors = ["blue.100", "pink.100", "yellow.100"]
  console.log(flashcards);
  return (
    <Box as="div" className="card-grid" my={5} mx={[3, 3]}>
      {flashcards.map((flashcard, id) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} colors =
        
        {_colors[id]}
        />;
      })}
    </Box>
  );
};

export default FlashcardList;
