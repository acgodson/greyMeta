import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

const Flashcard = ({ flashcard , colors}) => {
  const [flip, setFlip] = useState(false);

  return (
    <Box
      as="div"
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <Box as="div" className="front" bgColor={colors} h="full" w="full"
      
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "xl",
        fontWeight: "semibold"
      }}
      >
        {flashcard.question}
    {flip? 
    
    <Box as="div" className="flashcard-options">
        
    <Box as="div" key={Math.random()} className="flashcard-option"
    
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "xl",
      fontWeight: "semibold"
    }}
    >
      {flashcard.answer}
    </Box>

</Box> : <></>
  
  }
      </Box>
      <Box as="div" className="back">
        {flashcard.answer}
      </Box>
    </Box>
  );
};

export default Flashcard;
