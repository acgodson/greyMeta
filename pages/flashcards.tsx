import React, { useState, useEffect } from "react";
import FlashcardList from "../section/flashcardlist";
// import axios from "axios";

function FlashCards() {
  //   const [cards, setCards] = useState([]);

  //   //useEffect(() => {
  //   //     axios.get('url')
  //   //           .then(res => {
  //   //             setCards(

  //   //                 res.data.results.map((item, index) => {
  //   //               let decoded_incorrect = item.incorrect_answers.map(it => decodeString(it))
  //   //               return {
  //   //                 id: `${index}-${Date.now()}`,
  //   //                 question: decodeString(item.question),
  //   //                 answer: decodeString(item.correct_answer),
  //   //                 options: [...decoded_incorrect, decodeString(item.correct_answer)]
  //   //               }
  //   //             }))
  //   //           });
  //   //   }, [])

  function decodeString(str: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return <FlashcardList flashcards={SAMPLE_CARDS} />;
}

const SAMPLE_CARDS = [
  {
    id: 1,
    question: "Meaning of HTML?",
    answer: "HyperText Mark-Up Language",
  },
  {
    id: 2,
    question: "Meaning of CSS",
    answer: "Cascading Style Sheets",
  },
  {
    id: 3,
    question: "HTML Elementsr",
    answer: "Open and Closed Tag used to render a content",
  },
];

export default FlashCards;
