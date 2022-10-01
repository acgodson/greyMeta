import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

const Flashcard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);

  return (
    <Box
      as="div"
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <Box as="div" className="front">
        {flashcard.question}
        <Box as="div" className="flashcard-options">
          {flashcard.options.map((option) => {
            return <div className="flashcard-option">{option}</div>;
          })}
        </Box>
      </Box>
      <Box as="div" className="back">
        {flashcard.answer}
      </Box>
    </Box>
  );
};

export default Flashcard;
